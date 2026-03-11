// modules/generate/prompts/cv.prompt.js

export function buildCVPrompt(profile, jobDescription) {
  return `
You are a professional CV writer. Your task is to rewrite the candidate's experience 
and skills to best match the job description provided.

CANDIDATE PROFILE:
Name: ${profile.title}
Base Summary: ${profile.summary}

EXPERIENCES:
${profile.experiences?.map(e => `
  - ${e.role} at ${e.company} (${e.start_date} - ${e.end_date ?? 'Present'})
    ${e.description}
`).join('\n') || 'None'}

SKILLS:
Hard: ${profile.skills?.filter(s => s.type === 'hard').map(s => s.name).join(', ') || 'None'}
Soft: ${profile.skills?.filter(s => s.type === 'soft').map(s => s.name).join(', ') || 'None'}

JOB DESCRIPTION:
${jobDescription}

INSTRUCTIONS:
- Tailor the summary specifically to this role and company
- Rewrite experience bullet points to highlight relevant achievements
- Only include skills that are relevant to this job
- Return ONLY valid JSON in this exact structure, no markdown, no explanation:

{
  "summary": "string",
  "experiences": [
    {
      "company": "string",
      "role": "string", 
      "startDate": "string",
      "endDate": "string or null",
      "bullets": ["string", "string"]
    }
  ],
  "hardSkills": ["string"],
  "softSkills": ["string"]
}
`;
}
