import { useState, useEffect, useCallback } from 'react';
import { supabase, StartupProfile, InvestorProfile } from '@/lib/supabase/client';
import { useAuth } from './useAuth';

interface UseProfileResult {
  profile: StartupProfile | InvestorProfile | null;
  loading: boolean;
  error: Error | null;
  updateProfile: (data: Partial<StartupProfile> | Partial<InvestorProfile>) => Promise<void>;
  uploadDocument: (file: File, type: 'pitch_deck' | 'business_model') => Promise<string | null>;
  completionPercentage: number;
}

export function useProfile(): UseProfileResult {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StartupProfile | InvestorProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [completionPercentage, setCompletionPercentage] = useState<number>(0);

  // Fetch profile data when user changes
  useEffect(() => {
    async function fetchProfile() {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Get user role
        const role = await getUserRole(user.id);
        
        if (role === 'startup') {
          await fetchStartupProfile(user.id);
        } else if (role === 'investor') {
          await fetchInvestorProfile(user.id);
        }
      } catch (err) {
        console.error('Fetch profile error:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch profile'));
      } finally {
        setLoading(false);
      }
    }
    
    fetchProfile();
  }, [user]);

  // Helper function to get user role
  const getUserRole = async (userId: string) => {
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
      
    if (profileError) throw profileError;
    return profileData.role;
  };

  // Helper function to fetch startup profile
  const fetchStartupProfile = async (userId: string) => {
    // Get startup profile
    const { data, error } = await supabase
      .from('startup_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    setProfile(data || null);
    
    // Calculate completion percentage for startup profile
    if (data) {
      calculateStartupCompletionPercentage(data);
    }
  };

  // Helper function to fetch investor profile
  const fetchInvestorProfile = async (userId: string) => {
    // Get investor profile
    const { data, error } = await supabase
      .from('investor_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    setProfile(data || null);
    
    // Calculate completion percentage for investor profile
    if (data) {
      calculateInvestorCompletionPercentage(data);
    }
  };

  // Helper function to calculate startup profile completion percentage
  const calculateStartupCompletionPercentage = (data: StartupProfile) => {
    const requiredFields = [
      'company_name', 'founding_date', 'industry', 'stage', 
      'revenue_model', 'team_size', 'location', 'value_proposition'
    ];
    
    const optionalFields = [
      'sub_industry', 'funding_amount', 'current_revenue', 'traction_metrics',
      'burn_rate', 'runway', 'cac', 'ltv', 'market_size', 'market_growth',
      'competitors', 'differentiators', 'risk_factors', 'growth_projections',
      'customer_segments', 'pitch_deck_url', 'business_model_url'
    ];
    
    calculateCompletionPercentage(data, requiredFields, optionalFields);
  };

  // Helper function to calculate investor profile completion percentage
  const calculateInvestorCompletionPercentage = (data: InvestorProfile) => {
    const requiredFields = [
      'firm_name', 'investment_focus', 'stage_preferences', 
      'investment_range_min', 'investment_range_max', 'geographic_focus'
    ];
    
    const optionalFields = [
      'portfolio_highlights', 'investment_thesis', 'involvement_level',
      'investment_timeline', 'risk_tolerance', 'success_criteria',
      'value_add_capabilities', 'special_interests', 'exclusions',
      'previous_success_stories'
    ];
    
    calculateCompletionPercentage(data, requiredFields, optionalFields);
  };

  // Generic function to calculate completion percentage
  const calculateCompletionPercentage = (data: any, requiredFields: string[], optionalFields: string[]) => {
    const completed = requiredFields.filter(field => 
      data[field] !== undefined && 
      data[field] !== null && 
      data[field] !== ''
    ).length;
    
    const optional = optionalFields.filter(field => 
      data[field] !== undefined && 
      data[field] !== null && 
      data[field] !== ''
    ).length;
    
    // Weight: Required fields are 100%, optional add another 50% to completion
    const percentage = Math.min(
      100, 
      Math.round((completed / requiredFields.length) * 70) + 
      Math.round((optional / optionalFields.length) * 30)
    );
    
    setCompletionPercentage(percentage);
  };

  // Update profile data
  const updateProfile = useCallback(async (data: Partial<StartupProfile> | Partial<InvestorProfile>) => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Get user role
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
        
      if (profileError) throw profileError;
      
      if (profileData.role === 'startup') {
        await updateStartupProfile(user.id, data as Partial<StartupProfile>);
      } else if (profileData.role === 'investor') {
        await updateInvestorProfile(user.id, data as Partial<InvestorProfile>);
      }
    } catch (err) {
      console.error('Update profile error:', err);
      setError(err instanceof Error ? err : new Error('Failed to update profile'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Helper function to update startup profile
  const updateStartupProfile = async (userId: string, data: Partial<StartupProfile>) => {
    // Check if startup profile exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('startup_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();
      
    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }
    
    // Update or create profile
    if (existingProfile) {
      await updateExistingProfile('startup_profiles', userId, data);
    } else {
      await createNewProfile('startup_profiles', userId, data);
    }
    
    // Mark profile as completed
    await markProfileCompleted(userId);
    
    // Fetch updated profile
    await fetchAndSetProfile('startup_profiles', userId);
  };

  // Helper function to update investor profile
  const updateInvestorProfile = async (userId: string, data: Partial<InvestorProfile>) => {
    // Check if investor profile exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('investor_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();
      
    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }
    
    // Update or create profile
    if (existingProfile) {
      await updateExistingProfile('investor_profiles', userId, data);
    } else {
      await createNewProfile('investor_profiles', userId, data);
    }
    
    // Mark profile as completed
    await markProfileCompleted(userId);
    
    // Fetch updated profile
    await fetchAndSetProfile('investor_profiles', userId);
  };

  // Helper function to update existing profile
  const updateExistingProfile = async (table: string, userId: string, data: any) => {
    const { error: updateError } = await supabase
      .from(table)
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);
        
    if (updateError) throw updateError;
  };

  // Helper function to create new profile
  const createNewProfile = async (table: string, userId: string, data: any) => {
    const { error: insertError } = await supabase
      .from(table)
      .insert({
        user_id: userId,
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
        
    if (insertError) throw insertError;
  };

  // Helper function to mark profile as completed
  const markProfileCompleted = async (userId: string) => {
    await supabase
      .from('profiles')
      .update({ profile_completed: true })
      .eq('id', userId);
  };

  // Helper function to fetch and set the profile
  const fetchAndSetProfile = async (table: string, userId: string) => {
    const { data: updatedProfile } = await supabase
      .from(table)
      .select('*')
      .eq('user_id', userId)
      .single();
      
    setProfile(updatedProfile);
  };

  // Upload document to storage
  const uploadDocument = useCallback(async (file: File, type: 'pitch_deck' | 'business_model'): Promise<string | null> => {
    if (!user) return null;
    
    try {
      setLoading(true);
      
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}_${user.id}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);
        
      const publicUrl = urlData.publicUrl;
      
      // Update profile with document URL
      if (type === 'pitch_deck') {
        await updateProfile({ pitch_deck_url: publicUrl } as Partial<StartupProfile>);
      } else if (type === 'business_model') {
        await updateProfile({ business_model_url: publicUrl } as Partial<StartupProfile>);
      }
      
      return publicUrl;
    } catch (err) {
      console.error('Upload document error:', err);
      setError(err instanceof Error ? err : new Error('Failed to upload document'));
      return null;
    } finally {
      setLoading(false);
    }
  }, [user, updateProfile]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    uploadDocument,
    completionPercentage
  };
} 