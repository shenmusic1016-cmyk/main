import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Shipment {
  id: string;
  tracking_number: string;
  sender_name: string;
  sender_location: string;
  receiver_name: string;
  receiver_location: string;
  status: string;
  current_location: string | null;
  estimated_delivery: string | null;
  weight: number | null;
  package_type: string | null;
  created_at: string;
  updated_at: string;
}
