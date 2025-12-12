import { createClient } from "@supabase/supabase-js";


const SUPABASE_URL="https://hhdronajrkxnetwqppkg.supabase.co"
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoZHJvbmFqcmt4bmV0d3FwcGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNTY3MjIsImV4cCI6MjA3OTkzMjcyMn0.sIDB1ufidIyBxbzPXElYdmQr9uoy_igfVLaqxAHx5WU"
 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

 
