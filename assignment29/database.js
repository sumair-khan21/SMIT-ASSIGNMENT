import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'


const supabaseUrl = 'https://nvupeqraatpystrletgo.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52dXBlcXJhYXRweXN0cmxldGdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0OTQ2MzgsImV4cCI6MjA2NjA3MDYzOH0.HoVTTwR8kZzUiSn1ufA6NRkNrWsOCZ_6hOMwS61U5lo"


export const supabase = createClient(supabaseUrl, supabaseKey)


export async function insertData(firstName, lastName, education, email, password) {
     firstName,
     lastName,
     education,
     email,
     password
     
     const { data, error } = await supabase
     .from('signup')
  .insert({ firstName, lastName, education, email, password })

  if(error){
      console.error('Error inserting data:', error)
    }
    return data;
}