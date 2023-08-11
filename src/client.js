import { createClient } from '@supabase/supabase-js';

const URL = 'https://kcbfaieafujjtitignzg.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjYmZhaWVhZnVqanRpdGlnbnpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1Mjc2MTMsImV4cCI6MjAwNzEwMzYxM30.HXg9_vExmlBvzdxJB-5TTTueIhmW4Y19sdAROrdjD2I'

export const supabase = createClient(URL, API_KEY);