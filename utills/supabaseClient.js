import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ilvfxupfjswcmljkuzzd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsdmZ4dXBmanN3Y21samt1enpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzOTU3NTcsImV4cCI6MjAxOTk3MTc1N30.70QD_rq5jg-Q5dZoRvkQZFcADVFVC_oF20TpqP4wlUc";

export default createClient(supabaseUrl, supabaseKey);
