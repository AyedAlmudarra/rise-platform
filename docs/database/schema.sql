-- RISE Platform Database Schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles Table: Basic user information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('startup', 'investor', 'admin')),
  name TEXT NOT NULL,
  profile_completed BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMP WITH TIME ZONE
);

-- Row Level Security policies for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profiles"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profiles"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Startup Profiles Table: Detailed startup information
CREATE TABLE IF NOT EXISTS startup_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  founding_date DATE,
  industry TEXT NOT NULL,
  sub_industry TEXT,
  stage TEXT NOT NULL,
  funding_amount NUMERIC,
  revenue_model TEXT,
  current_revenue NUMERIC,
  team_size INTEGER,
  location TEXT,
  value_proposition TEXT,
  traction_metrics TEXT,
  burn_rate NUMERIC,
  runway NUMERIC,
  cac NUMERIC,
  ltv NUMERIC,
  market_size NUMERIC,
  market_growth NUMERIC,
  competitors TEXT[],
  differentiators TEXT,
  risk_factors TEXT,
  growth_projections TEXT,
  customer_segments TEXT,
  pitch_deck_url TEXT,
  business_model_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security policies for startup_profiles
ALTER TABLE startup_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Startups can view their own profiles"
  ON startup_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Startups can update their own profiles"
  ON startup_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Investors can view startup profiles"
  ON startup_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'investor'
    )
  );

-- Investor Profiles Table: Detailed investor information
CREATE TABLE IF NOT EXISTS investor_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  firm_name TEXT NOT NULL,
  investment_focus TEXT[],
  stage_preferences TEXT[],
  investment_range_min NUMERIC,
  investment_range_max NUMERIC,
  geographic_focus TEXT[],
  portfolio_highlights TEXT,
  investment_thesis TEXT,
  involvement_level TEXT,
  investment_timeline TEXT,
  risk_tolerance TEXT,
  success_criteria TEXT,
  value_add_capabilities TEXT[],
  special_interests TEXT[],
  exclusions TEXT[],
  previous_success_stories TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security policies for investor_profiles
ALTER TABLE investor_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Investors can view their own profiles"
  ON investor_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Investors can update their own profiles"
  ON investor_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Startups can view investor profiles"
  ON investor_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'startup'
    )
  );

-- Matches Table: Startup-investor matching information
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  startup_id UUID REFERENCES startup_profiles(id) ON DELETE CASCADE,
  investor_id UUID REFERENCES investor_profiles(id) ON DELETE CASCADE,
  compatibility_score NUMERIC NOT NULL,
  match_reasons TEXT[],
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(startup_id, investor_id)
);

-- Row Level Security policies for matches
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their matches"
  ON matches FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM startup_profiles 
      WHERE startup_profiles.id = matches.startup_id 
      AND startup_profiles.user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM investor_profiles 
      WHERE investor_profiles.id = matches.investor_id 
      AND investor_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their match status"
  ON matches FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM startup_profiles 
      WHERE startup_profiles.id = matches.startup_id 
      AND startup_profiles.user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM investor_profiles 
      WHERE investor_profiles.id = matches.investor_id 
      AND investor_profiles.user_id = auth.uid()
    )
  );

-- Analyses Table: AI-generated analyses
CREATE TABLE IF NOT EXISTS analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  analysis_data JSONB NOT NULL,
  model_used TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  feedback TEXT,
  feedback_rating INTEGER
);

-- Row Level Security policies for analyses
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and manage their analyses"
  ON analyses FOR ALL
  USING (auth.uid() = user_id);

-- Create trigger to update the updated_at column
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to all tables with updated_at columns
CREATE TRIGGER set_timestamp_startup_profiles
BEFORE UPDATE ON startup_profiles
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_investor_profiles
BEFORE UPDATE ON investor_profiles
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_matches
BEFORE UPDATE ON matches
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp(); 