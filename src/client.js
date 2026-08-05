import { createClient } from '@supabase/supabase-js'


const supabaseUrl = "https://jeykrjgjqgqnbrnwpmle.supabase.co"

const supabaseKey = "sb_publishable_CIO8poIIGWRwhkjw2nvBCw_FPauE-Ga"


export const supabase = createClient(
    supabaseUrl,
    supabaseKey
)