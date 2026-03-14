// modules/generate/prompts/cover-letter.prompt.js

export function buildCoverLetterPrompt(profile, jobDescription) {
  return `
You are a professional career coach. Your task is to write a highly tailored, compelling 
cover letter (approx. 300 words) for the candidate, specifically addressing the job 
description provided.

CANDIDATE DATA:
Base Info:
  - Full Name: ${profile.full_name}
Current Title: ${profile.title}
Base Summary: ${profile.summary}
Experiences: ${profile.experiences?.map(e => `${e.role} at ${e.company}`).join(', ') || 'None'}
Skills: ${profile.skills?.map(s => s.name).join(', ') || 'None'}
Education: ${profile.education?.map(e => `${e.degree} in ${e.field} from ${e.institution} ${e.start_date} - ${e.end_date || 'Present'} `).join(', ') || 'None'}


JOB DESCRIPTION:
${jobDescription}

INSTRUCTIONS:
- Address the hiring manager with a professional greeting.
- Hook the reader in the opening paragraph by expressing enthusiasm for the specific role.
- Use the middle paragraphs to bridge the candidate's specific achievements with the job's needs.
- Close with a strong call to action.
- Return ONLY valid JSON in this exact structure, no markdown, no explanation:

{
  "coverLetter": "string"
}
`;
}
