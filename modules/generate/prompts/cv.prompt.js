import { buildSecurePrompt, sanitizeUserInput, sanitizeProfileData } from "@/shared/utils/prompt-security";

export function buildCVPrompt(profile, jobDescription) {
  // Prepare profile data with sanitization
  const profileData = {
    fullName: sanitizeProfileData(profile.full_name || ''),
    email: sanitizeProfileData(profile.email || ''),
    phone: sanitizeProfileData(profile.phone || ''),
    location: sanitizeProfileData(profile.location || ''),
    linkedin: sanitizeProfileData(profile.linkedin_url || ''),
    title: sanitizeProfileData(profile.title || ''),
    summary: sanitizeProfileData(profile.summary || ''),
    education: profile.education?.map(e => ({
      degree: sanitizeProfileData(e.degree || ''),
      field: sanitizeProfileData(e.field || ''),
      institution: sanitizeProfileData(e.institution || ''),
      startDate: e.start_date,
      endDate: e.end_date
    })) || [],
    experiences: profile.experiences?.map(e => ({
      role: sanitizeProfileData(e.role || ''),
      company: sanitizeProfileData(e.company || ''),
      startDate: e.start_date,
      endDate: e.end_date,
      description: sanitizeProfileData(e.description || '')
    })) || [],
    hardSkills: profile.skills?.filter(s => s.type === 'hard').map(s => sanitizeProfileData(s.name)) || [],
    softSkills: profile.skills?.filter(s => s.type === 'soft').map(s => sanitizeProfileData(s.name)) || []
  };

  const systemInstructions = `
You are a professional CV writer AI assistant. Your ONLY role is to tailor CVs based on provided data.

YOUR TASK:
Analyze the candidate's profile data and job description, then generate a tailored CV in JSON format.

STRICT OUTPUT REQUIREMENTS:
1. Return ONLY valid JSON - no markdown, no explanations, no backticks
2. Tailor the summary specifically to the role and company
3. Rewrite experience bullets to highlight relevant achievements
4. Only include skills relevant to the job description
5. Dates MUST use format: "Month YYYY" (e.g., "January 2025")
6. Always include education section
7. Use ONLY information from the provided profile data
8. Identify must-have vs nice-to-have requirements from job description

REQUIRED JSON STRUCTURE:
{
  "contactInfo": {
    "fullName": "string",
    "email": "string",
    "phone": "string or null",
    "location": "string or null",
    "linkedin": "string or null"
  },
  "title": "string",
  "summary": "string (3-4 sentences)",
  "experiences": [
    {
      "company": "string",
      "role": "string",
      "startDate": "Month YYYY",
      "endDate": "Month YYYY or null",
      "bullets": ["string", "string", "string"]
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "field": "string",
      "startDate": "Month YYYY",
      "endDate": "Month YYYY or null"
    }
  ],
  "hardSkills": ["string"],
  "softSkills": ["string"]
}
`;

  return buildSecurePrompt(
    systemInstructions,
    sanitizeUserInput(jobDescription),
    profileData
  );
}
