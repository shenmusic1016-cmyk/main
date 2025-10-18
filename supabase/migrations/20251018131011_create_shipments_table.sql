/*
  # Create shipments tracking table

  1. New Tables
    - `shipments`
      - `id` (uuid, primary key) - Unique identifier for each shipment
      - `tracking_number` (text, unique, not null) - Unique tracking number for customers
      - `sender_name` (text, not null) - Name of the sender
      - `sender_location` (text, not null) - Sender's location
      - `receiver_name` (text, not null) - Name of the receiver
      - `receiver_location` (text, not null) - Receiver's destination
      - `status` (text, not null) - Current shipment status
      - `current_location` (text) - Current location of the shipment
      - `estimated_delivery` (timestamptz) - Estimated delivery date
      - `weight` (numeric) - Package weight in kg
      - `package_type` (text) - Type of package
      - `created_at` (timestamptz) - When the shipment was created
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `shipments` table
    - Add policy for public read access (anyone can track with tracking number)
    - Add policy for authenticated users to manage shipments
*/

CREATE TABLE IF NOT EXISTS shipments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number text UNIQUE NOT NULL,
  sender_name text NOT NULL,
  sender_location text NOT NULL,
  receiver_name text NOT NULL,
  receiver_location text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  current_location text,
  estimated_delivery timestamptz,
  weight numeric,
  package_type text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view shipments with tracking number"
  ON shipments
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert shipments"
  ON shipments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update shipments"
  ON shipments
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete shipments"
  ON shipments
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for faster tracking number lookups
CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON shipments(tracking_number);

-- Insert sample shipments for demonstration
INSERT INTO shipments (tracking_number, sender_name, sender_location, receiver_name, receiver_location, status, current_location, estimated_delivery, weight, package_type)
VALUES
  ('GDX1234567890', 'John Smith', 'New York, USA', 'Sarah Johnson', 'Los Angeles, USA', 'in_transit', 'Chicago Distribution Center', now() + interval '2 days', 15.5, 'Package'),
  ('GDX0987654321', 'Michael Chen', 'Shanghai, China', 'Robert Brown', 'London, UK', 'customs', 'London Heathrow Airport', now() + interval '3 days', 8.2, 'Documents'),
  ('GDX5555666777', 'Emma Wilson', 'Sydney, Australia', 'David Lee', 'Singapore', 'delivered', 'Singapore Hub', now() - interval '1 day', 12.0, 'Package')
ON CONFLICT (tracking_number) DO NOTHING;