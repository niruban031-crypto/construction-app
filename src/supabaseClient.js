import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kreteswkeshqdjqwpuil.supabase.co'
const supabaseAnonKey = 'sb_publishable_1LMCwVwukBWYoqGuQN-ypg_yguZZtHg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)