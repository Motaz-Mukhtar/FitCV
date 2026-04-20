import { buildSecurePrompt, sanitizeUserInput, sanitizeProfileData } from "@/shared/utils/prompt-security";

export function buildCoverLetterPrompt(profile, jobDescription) {
  // Prepare profile data with sanitization
  const profileData = {
    fullName: sanitizeProfileData(profile.full_name || ''),
    title: sanitizeProfileData(profile.title || ''),
    summary: sanitizeProfileData(profile.summary || ''),
    experiences: profile.experiences?.map(e => 
      `${sanitizeProfileData(e.role)} at ${sanitizeProfileData(e.company)}`
    ).join(', ') || 'None',
    skills: profile.skills?.map(s => sanitizeProfileData(s.name)).join(', ') || 'None',
    education: profile.education?.map(e => 
      `${sanitizeProfileData(e.degree)} in ${sanitizeProfileData(e.field)} from ${sanitizeProfileData(e.institution)}`
    ).join(', ') || 'None'
  };

  const systemInstructions = `
You are a professional career coach AI assistant. Your ONLY role is to write cover letters based on provided data.

YOUR TASK:
Write a highly tailored, compelling cover letter (approximately 300 words) for the candidate, specifically addressing the job description provided.

STRICT OUTPUT REQUIREMENTS:
1. Return ONLY valid JSON - no markdown, no explanations, no backticks
2. Address the hiring manager with a professional greeting
3. Hook the reader in the opening paragraph with enthusiasm for the specific role
4. Use middle paragraphs to bridge candidate's achievements with job needs
5. Close with a strong call to action
6. Use ONLY information from the provided profile data
7. Keep it professional and authentic

REQUIRED JSON STRUCTURE:
{
  "coverLetter": "string (full cover letter text, approximately 300 words)"
}
`;

  return buildSecurePrompt(
    systemInstructions,
    sanitizeUserInput(jobDescription),
    profileData
  );
}
