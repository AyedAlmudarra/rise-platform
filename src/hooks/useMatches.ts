import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { calculateMatchCompatibility } from '@/lib/ai/openai';
import { useAuth } from './useAuth';

interface Match {
  id: string;
  startup_id: string;
  investor_id: string;
  compatibility_score: number;
  match_reasons: string[];
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
  startup_profile?: any;
  investor_profile?: any;
}

interface UseMatchesResult {
  matches: Match[];
  loading: boolean;
  error: Error | null;
  findMatches: () => Promise<void>;
  updateMatchStatus: (matchId: string, status: 'accepted' | 'rejected') => Promise<void>;
}

// Helper function to fetch startup matches
async function fetchStartupMatches(userId: string) {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      investor_profile:investor_profiles(*)
    `)
    .eq('startup_id', userId);
    
  if (error) throw error;
  return data || [];
}

// Helper function to fetch investor matches
async function fetchInvestorMatches(userId: string) {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      startup_profile:startup_profiles(*)
    `)
    .eq('investor_id', userId);
    
  if (error) throw error;
  return data || [];
}

// Helper function to calculate and create a match
async function createMatchIfCompatible(startupProfile: any, investorProfile: any, startupId: string, investorId: string) {
  try {
    // Check if match already exists
    const { data: existingMatch } = await supabase
      .from('matches')
      .select('id')
      .eq('startup_id', startupId)
      .eq('investor_id', investorId)
      .single();
      
    if (existingMatch) return null; // Skip if match already exists
    
    // Calculate compatibility
    const compatibility = await calculateMatchCompatibility(startupProfile, investorProfile);
    
    // Insert match if score is above 50%
    if (compatibility.compatibilityScore >= 50) {
      const { data: match, error: matchError } = await supabase
        .from('matches')
        .insert({
          startup_id: startupId,
          investor_id: investorId,
          compatibility_score: compatibility.compatibilityScore,
          match_reasons: compatibility.matchReasons,
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
        
      if (matchError) throw matchError;
      
      return match;
    }
    
    return null;
  } catch (err) {
    console.error('Match calculation error:', err);
    return null;
  }
}

// Helper function to process matches array
function processMatches(existingMatches: Match[], newMatches: Match[]) {
  const combined = [...existingMatches, ...newMatches];
  
  // Remove duplicates and sort by score
  return combined
    .filter((match, index, self) => 
      index === self.findIndex(m => m.id === match.id)
    )
    .sort((a, b) => b.compatibility_score - a.compatibility_score);
}

export function useMatches(): UseMatchesResult {
  const { user } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch matches when user changes
  useEffect(() => {
    async function fetchMatches() {
      if (!user) {
        setMatches([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Get user role
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
          
        if (profileError) throw profileError;
        
        let matchesData: Match[] = [];
        
        if (profileData.role === 'startup') {
          matchesData = await fetchStartupMatches(user.id);
        } else if (profileData.role === 'investor') {
          matchesData = await fetchInvestorMatches(user.id);
        }
        
        // Sort matches by compatibility score
        matchesData.sort((a, b) => b.compatibility_score - a.compatibility_score);
        
        setMatches(matchesData);
      } catch (err) {
        console.error('Fetch matches error:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch matches'));
      } finally {
        setLoading(false);
      }
    }
    
    fetchMatches();
  }, [user]);

  // Find new matches
  const findMatches = useCallback(async () => {
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
        await findMatchesForStartup(user.id);
      } else if (profileData.role === 'investor') {
        await findMatchesForInvestor(user.id);
      }
    } catch (err) {
      console.error('Find matches error:', err);
      setError(err instanceof Error ? err : new Error('Failed to find matches'));
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Find matches for a startup
  const findMatchesForStartup = async (userId: string) => {
    // Get startup profile
    const { data: startupProfile, error: startupError } = await supabase
      .from('startup_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (startupError) throw startupError;
    
    // Get all investors
    const { data: investors, error: investorsError } = await supabase
      .from('investor_profiles')
      .select('*');
      
    if (investorsError) throw investorsError;
    
    // Calculate match scores for each investor
    const matchPromises = investors.map(async (investor) => {
      const match = await createMatchIfCompatible(
        startupProfile, 
        investor, 
        userId, 
        investor.user_id
      );
      
      return match ? { ...match, investor_profile: investor } : null;
    });
    
    const newMatches = (await Promise.all(matchPromises)).filter(Boolean) as Match[];
    
    // Update matches state
    setMatches(prev => processMatches(prev, newMatches));
  };

  // Find matches for an investor
  const findMatchesForInvestor = async (userId: string) => {
    // Get investor profile
    const { data: investorProfile, error: investorError } = await supabase
      .from('investor_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (investorError) throw investorError;
    
    // Get all startups
    const { data: startups, error: startupsError } = await supabase
      .from('startup_profiles')
      .select('*');
      
    if (startupsError) throw startupsError;
    
    // Calculate match scores for each startup
    const matchPromises = startups.map(async (startup) => {
      const match = await createMatchIfCompatible(
        startup, 
        investorProfile, 
        startup.user_id, 
        userId
      );
      
      return match ? { ...match, startup_profile: startup } : null;
    });
    
    const newMatches = (await Promise.all(matchPromises)).filter(Boolean) as Match[];
    
    // Update matches state
    setMatches(prev => processMatches(prev, newMatches));
  };

  // Update match status
  const updateMatchStatus = useCallback(async (matchId: string, status: 'accepted' | 'rejected') => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Update match status
      const { error } = await supabase
        .from('matches')
        .update({
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', matchId)
        .single();
        
      if (error) throw error;
      
      // Update matches state
      setMatches(prev => 
        prev.map(match => 
          match.id === matchId 
            ? { ...match, status, updated_at: new Date().toISOString() } 
            : match
        )
      );
    } catch (err) {
      console.error('Update match status error:', err);
      setError(err instanceof Error ? err : new Error('Failed to update match status'));
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    matches,
    loading,
    error,
    findMatches,
    updateMatchStatus
  };
} 