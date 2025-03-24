import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Cache for storing analysis results to minimize API calls
const analysisCache = new Map<string, { result: any; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour cache lifetime

/**
 * Analyze a startup profile using OpenAI
 */
export async function analyzeStartupProfile(profileData: any) {
  // Create a cache key based on the profile data
  const cacheKey = `startup_${JSON.stringify(profileData)}`;
  
  // Check if we have a cached result
  const cachedResult = analysisCache.get(cacheKey);
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_TTL) {
    return cachedResult.result;
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert startup analyst for the Saudi market. Analyze the startup profile data and provide insights on strengths, weaknesses, opportunities, and potential risks. Keep your response structured and concise.'
        },
        {
          role: 'user',
          content: `Analyze this startup profile: ${JSON.stringify(profileData)}`
        }
      ],
      temperature: 0.3,
    });
    
    const result = {
      analysis: response.choices[0].message.content,
      modelUsed: process.env.OPENAI_MODEL ?? 'gpt-3.5-turbo',
      timestamp: new Date().toISOString()
    };
    
    // Cache the result
    analysisCache.set(cacheKey, { result, timestamp: Date.now() });
    
    return result;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to analyze startup profile');
  }
}

/**
 * Calculate match compatibility between startup and investor
 */
export async function calculateMatchCompatibility(startupProfile: any, investorProfile: any) {
  // Create a cache key based on both profiles
  const cacheKey = `match_${startupProfile.id}_${investorProfile.id}`;
  
  // Check if we have a cached result
  const cachedResult = analysisCache.get(cacheKey);
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_TTL) {
    return cachedResult.result;
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert investment matchmaker for the Saudi market. Calculate the compatibility between the startup and investor profiles, providing a percentage score and key reasons for the match.'
        },
        {
          role: 'user',
          content: `Startup profile: ${JSON.stringify(startupProfile)}\nInvestor profile: ${JSON.stringify(investorProfile)}`
        }
      ],
      temperature: 0.3,
    });
    
    // Parse the response to extract score and reasons
    const content = response.choices[0].message.content || '';
    
    // Simple parsing logic - can be enhanced for production
    const scoreMatch = content.match(/(\d+)%/);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 50;
    
    // Extract reasons by looking for lists or sections
    const reasonsMatch = content.match(/reasons?:(.+?)(?:\n\n|\n$|$)/is);
    const reasonsText = reasonsMatch ? reasonsMatch[1] : content;
    const reasons = reasonsText
      .split(/\n-|\n\d+\./)
      .map((r: string) => r.trim())
      .filter((r: string) => r.length > 0);
    
    const result = {
      compatibilityScore: score,
      matchReasons: reasons,
      fullAnalysis: content,
      timestamp: new Date().toISOString()
    };
    
    // Cache the result
    analysisCache.set(cacheKey, { result, timestamp: Date.now() });
    
    return result;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to calculate match compatibility');
  }
}

export default openai; 