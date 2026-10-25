-- ============================================================
-- BUILD-VERSE 2026 registrations              (ADDITIVE, SAFE TO APPLY ANY TIME)
-- ============================================================
-- Two tables + one function that saves a whole team atomically:
--   buildverse_teams    one row per team (solo = a team of one)
--   buildverse_members  one row per person, INCLUDING the leader
--
-- A person can be in only one team: unique(lower(email)) and unique(lower(roll_number)).
-- A payment id can be used only once.
--
-- Access model (same as media_members): RLS ON with NO policies and all grants
-- revoked, so browsers can never read or write these tables. Only the server
-- (service-role key) calls register_buildverse_team() after validating input.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.buildverse_teams (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_name      TEXT NOT NULL CHECK (char_length(team_name) BETWEEN 2 AND 60),
    payment_ref    TEXT,
    payment_status TEXT NOT NULL DEFAULT 'pending'
                   CHECK (payment_status IN ('pending', 'verified', 'rejected')),
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.buildverse_members (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id      UUID NOT NULL REFERENCES public.buildverse_teams(id) ON DELETE CASCADE,
    is_leader    BOOLEAN NOT NULL DEFAULT FALSE,
    name         TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 80),
    email        TEXT NOT NULL,
    roll_number  TEXT NOT NULL,
    phone        TEXT,
    course       TEXT,
    year         TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS buildverse_members_email_uidx
    ON public.buildverse_members (lower(email));
CREATE UNIQUE INDEX IF NOT EXISTS buildverse_members_roll_uidx
    ON public.buildverse_members (lower(roll_number));
CREATE UNIQUE INDEX IF NOT EXISTS buildverse_teams_payment_uidx
    ON public.buildverse_teams (payment_ref) WHERE payment_ref IS NOT NULL;
-- At most one leader per team.
CREATE UNIQUE INDEX IF NOT EXISTS buildverse_members_one_leader_uidx
    ON public.buildverse_members (team_id) WHERE is_leader;

ALTER TABLE public.buildverse_teams   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buildverse_members ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.buildverse_teams   FROM anon, authenticated;
REVOKE ALL ON public.buildverse_members FROM anon, authenticated;

-- Saves a team and its people in ONE transaction: all of it or none of it.
-- Raises unique_violation (SQLSTATE 23505) if anyone is already registered.
CREATE OR REPLACE FUNCTION public.register_buildverse_team(
    p_team_name   TEXT,
    p_payment_ref TEXT,
    p_leader      JSONB,
    p_members     JSONB
) RETURNS UUID
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
    v_team_id UUID;
    m JSONB;
BEGIN
    IF jsonb_typeof(p_members) <> 'array' OR jsonb_array_length(p_members) > 3 THEN
        RAISE EXCEPTION 'a team can have at most 4 people' USING ERRCODE = '22023';
    END IF;

    INSERT INTO public.buildverse_teams (team_name, payment_ref)
    VALUES (p_team_name, p_payment_ref)
    RETURNING id INTO v_team_id;

    INSERT INTO public.buildverse_members (team_id, is_leader, name, email, roll_number, phone, course, year)
    VALUES (v_team_id, TRUE, p_leader->>'name', p_leader->>'email', p_leader->>'rollNumber',
            p_leader->>'phone', p_leader->>'course', p_leader->>'year');

    FOR m IN SELECT * FROM jsonb_array_elements(p_members) LOOP
        INSERT INTO public.buildverse_members (team_id, is_leader, name, email, roll_number)
        VALUES (v_team_id, FALSE, m->>'name', m->>'email', m->>'rollNumber');
    END LOOP;

    RETURN v_team_id;
END;
$$;

REVOKE ALL ON FUNCTION public.register_buildverse_team(TEXT, TEXT, JSONB, JSONB) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.register_buildverse_team(TEXT, TEXT, JSONB, JSONB) TO service_role;
