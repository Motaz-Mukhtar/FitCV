export function buildCVPrompt(profile, jobDescription) {
  return `
You are a professional CV writer. Your task is to tailor the candidate's CV 
to best match the job description provided.

CANDIDATE PROFILE:
Full Name: ${profile.full_name}
Email: ${profile.email}
Phone: ${profile.phone ?? 'not provided'}
Location: ${profile.location ?? 'not provided'}
LinkedIn: ${profile.linkedin_url ?? 'not provided'}
Professional Title: ${profile.title}
Base Summary: ${profile.summary}

EDUCATION:
${profile.education.map(e => `
  - ${e.degree} in ${e.field}
    ${e.institution}
    ${e.start_date} - ${e.end_date ?? 'Present'}
`).join('\n')}

EXPERIENCES:
${profile.experiences.map(e => `
  - ${e.role} at ${e.company}
    Start: ${e.start_date} | End: ${e.end_date ?? 'Present'}
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
- Don't address any additional information about the candidate that is not provided in the profile data, only use what is given.
- Identify the Must-Haves vs. Nice-to-Haves Look for words like “required,” “must have,” or qualifications listed early on. These are top priorities.
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