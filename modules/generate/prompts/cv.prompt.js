export function buildCVPrompt(profile, jobDescription) {
  return `
You are a professional CV writer. Your task is to tailor the candidate's CV 
to best match the job description provided.

CANDIDATE PROFILE:
Full Name: ${profile.fullName}
Email: ${profile.email}
Phone: ${profile.phone ?? 'not provided'}
Location: ${profile.location ?? 'not provided'}
LinkedIn: ${profile.linkedinUrl ?? 'not provided'}
Professional Title: ${profile.title}
Base Summary: ${profile.summary}

EDUCATION:
${profile.education.map(e => `
  - ${e.degree} in ${e.field}
    ${e.institution}
    ${e.startDate} - ${e.endDate ?? 'Present'}
`).join('\n')}

EXPERIENCES:
${profile.experiences.map(e => `
  - ${e.role} at ${e.company}
    Start: ${e.startDate} | End: ${e.endDate ?? 'Present'}
    ${e.description}
`).join('\n')}

SKILLS:
Hard Skills: ${profile.skills.filter(s => s.type === 'hard').map(s => s.name).join(', ')}
Soft Skills: ${profile.skills.filter(s => s.type === 'soft').map(s => s.name).join(', ')}

JOB DESCRIPTION:
${jobDescription}

STRICT INSTRUCTIONS:
- Tailor the summary specifically to this exact role and company
- Rewrite experience bullets to highlight what is most relevant to this job
- Only include skills relevant to this job description
- Dates MUST follow this format: "Month YYYY" (e.g. "January 2025", "August 2024")
- Always include the education section even if not required by the job
- Return ONLY valid JSON, no markdown, no explanation, no backticks:

{
  "contactInfo": {
    "fullName": "string",
    "email": "string",
    "phone": "string or null",
    "location": "string or null",
    "linkedin": "string or null"
  },
  "title": "string",
  "summary": "string",
  "experiences": [
    {
      "company": "string",
      "role": "string",
      "startDate": "Month YYYY format",
      "endDate": "Month YYYY format or null",
      "bullets": ["string", "string", "string"]
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "field": "string",
      "startDate": "Month YYYY format",
      "endDate": "Month YYYY format or null"
    }
  ],
  "hardSkills": ["string"],
  "softSkills": ["string"]
}
`
}