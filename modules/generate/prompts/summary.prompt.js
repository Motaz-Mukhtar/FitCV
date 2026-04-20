import { buildSecurePrompt, sanitizeUserInput, sanitizeProfileData } from "@/shared/utils/prompt-security";

export function buildSummaryPrompt(profile, jobDescription) {
  // Prepare profile data with sanitization
  const profileData = {
    title: sanitizeProfileData(profile.title || ''),
    summary: sanitizeProfileData(profile.summary || ''),
    skills: profile.skills?.map(s => sanitizeProfileData(s.name)).join(', ') || 'None'
  };

  const systemInstructions = `
You are a professional career coach AI assistant. Your ONLY role is to write professional summaries based on provided data.

YOUR TASK:
Write a powerful, concise professional summary (3-4 sentences) for the candidate's CV, tailored specifically to the job description provided.

STRICT OUTPUT REQUIREMENTS:
1. Return ONLY valid JSON - no markdown, no explanations, no backticks
2. Focus on overlap between candidate's experience and job's core requirements
3. Use strong action verbs and industry-standard terminology
4. Make it impactful and immediately show why candidate is a fit
5. Use ONLY information from the provided profile data
6. Keep it concise (3-4 sentences maximum)

REQUIRED JSON STRUCTURE:
{
  "summary": "string (3-4 sentences)"
}
`;

  return buildSecurePrompt(
    systemInstructions,
    sanitizeUserInput(jobDescription),
    profileData
  );
}
