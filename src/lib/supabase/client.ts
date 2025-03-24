import { createClient } from '@supabase/supabase-js';

// These values will be replaced with actual environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for database tables
export type Profile = {
  id: string;
  created_at: string;
  email: string;
  role: 'startup' | 'investor' | 'admin';
  name: string;
  profile_completed: boolean;
  };

export type StartupProfile = {
  id: string;
  user_id: string;
  company_name: string;
  founding_date: string;
  industry: string;
  sub_industry?: string;
  stage: string;
  funding_amount?: number;
  revenue_model: string;
  current_revenue?: number;
  team_size: number;
  location: string;
  value_proposition: string;
  traction_metrics?: string;
  burn_rate?: number;
  runway?: number;
  cac?: number;
  ltv?: number;
  market_size?: number;
  market_growth?: number;
  competitors?: string[];
  differentiators?: string;
  risk_factors?: string;
  growth_projections?: string;
  customer_segments?: string;
  pitch_deck_url?: string;
  business_model_url?: string;
  created_at: string;
  updated_at: string;
};

export type InvestorProfile = {
  id: string;
  user_id: string;
  firm_name: string;
  investment_focus: string[];
  stage_preferences: string[];
  investment_range_min: number;
  investment_range_max: number;
  geographic_focus: string[];
  portfolio_highlights?: string;
  investment_thesis?: string;
  involvement_level?: string;
  investment_timeline?: string;
  risk_tolerance?: string;
  success_criteria?: string;
  value_add_capabilities?: string[];
  special_interests?: string[];
  exclusions?: string[];
  previous_success_stories?: string;
  created_at: string;
  updated_at: string;
};

export type Match = {
  id: string;
  startup_id: string;
  investor_id: string;
  compatibility_score: number;
  match_reasons: string[];
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
};

export type Analysis = {
  id: string;
  user_id: string;
  analysis_data: any;
  model_used: string;
  created_at: string;
  feedback?: string;
  feedback_rating?: number;
}; 