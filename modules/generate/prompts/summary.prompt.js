// modules/generate/prompts/summary.prompt.js

export function buildSummaryPrompt(profile, jobDescription) {
  return `
You are a professional career coach. Your task is to write a powerful, concise professional summary 
(3-4 sentences) for the candidate's CV, tailored specifically to the job description provided.

CANDIDATE DATA:
Current Title: ${profile.title}
Base Summary: ${profile.summary}
Key Skills: ${profile.skills?.map(s => s.name).join(', ') || 'None'}

JOB DESCRIPTION:
${jobDescription}

INSTRUCTIONS:
- Focus on the overlap between the candidate's experience and the job's core requirements.
- Use strong action verbs and industry-standard terminology.
- The summary should be impactful and immediately show why the candidate is a fit.
- Return ONLY valid JSON in this exact structure, no markdown, no explanation:

{
  "summary": "string"
}
`;
}
