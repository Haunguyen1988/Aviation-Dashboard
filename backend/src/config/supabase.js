const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use Service Role for backend admin tasks

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key in environment variables');
    // Don't crash immediately, allow env to be set, but warn heavily
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
