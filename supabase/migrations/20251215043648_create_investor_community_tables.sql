/*
  # Create Investor Community Tables

  1. New Tables
    - `investor_recommendations`
      - `id` (uuid, primary key)
      - `investor_name` (text) - Name of the investor
      - `investor_avatar` (text) - Avatar initials
      - `recommendation` (text) - BUY, SELL, or HOLD
      - `stock_symbol` (text) - Stock ticker
      - `stock_price` (numeric) - Price at time of recommendation
      - `reason` (text) - Reasoning behind recommendation
      - `likes` (integer) - Number of likes, default 0
      - `comments_count` (integer) - Number of comments, default 0
      - `created_at` (timestamptz) - When recommendation was made

    - `chat_messages`
      - `id` (uuid, primary key)
      - `user_name` (text) - Username
      - `user_avatar` (text) - Avatar initials
      - `message` (text) - Chat message content
      - `stock_symbol` (text) - Related stock ticker
      - `created_at` (timestamptz) - When message was sent

  2. Security
    - Enable RLS on both tables
    - Add policy for anyone to read recommendations and messages (public feed)
    - Add policy for authenticated users to create recommendations and messages
*/

-- Create investor_recommendations table
CREATE TABLE IF NOT EXISTS investor_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_name text NOT NULL,
  investor_avatar text NOT NULL,
  recommendation text NOT NULL CHECK (recommendation IN ('BUY', 'SELL', 'HOLD')),
  stock_symbol text NOT NULL,
  stock_price numeric NOT NULL,
  reason text NOT NULL,
  likes integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL,
  user_avatar text NOT NULL,
  message text NOT NULL,
  stock_symbol text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE investor_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Recommendations policies
CREATE POLICY "Anyone can view recommendations"
  ON investor_recommendations
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create recommendations"
  ON investor_recommendations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Chat messages policies
CREATE POLICY "Anyone can view messages"
  ON chat_messages
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can send messages"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_recommendations_stock ON investor_recommendations(stock_symbol, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_stock ON chat_messages(stock_symbol, created_at DESC);
