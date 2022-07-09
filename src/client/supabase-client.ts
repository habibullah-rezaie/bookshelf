import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY_ANON = process.env.REACT_APP_SUPABASE_KEY_ANON;

const supabaseClient =
  SUPABASE_KEY_ANON && SUPABASE_URL
    ? createClient(SUPABASE_URL, SUPABASE_KEY_ANON)
    : null;

export default supabaseClient;
