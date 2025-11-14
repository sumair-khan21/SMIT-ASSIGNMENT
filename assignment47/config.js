

const supabaseUrl = 'https://kerazyzofdhkkypiwpzw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlcmF6eXpvZmRoa2t5cGl3cHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMjAwMTMsImV4cCI6MjA2ODY5NjAxM30.aCmnptFsLXwrfuTL2FQl5NNAsHijYPnfEKL8_irzqNM'
export const client = supabase.createClient(supabaseUrl, supabaseKey)

console.log(client);
