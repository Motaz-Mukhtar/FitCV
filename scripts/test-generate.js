// scripts/test-generate.js
// Run this after setting up your .env.local with a real Gemini API Key
// Usage: node scripts/test-generate.js

const TEST_CONFIG = {
  baseUrl: 'http://localhost:3000/api/v1',
  profileId: 'REPLACE_WITH_REAL_PROFILE_ID', // Get this from Prisma Studio
};

async function testGenerateCV() {
  console.log('--- Testing CV Generation ---');
  try {
    const res = await fetch(`${TEST_CONFIG.baseUrl}/generate/cv`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profile_id: TEST_CONFIG.profileId,
        job_description: "We are looking for a Senior React Developer with experience in Next.js and Tailwind CSS. The candidate should have strong communication skills and experience with Prisma/PostgreSQL.",
        company_name: "Trae Labs",
        job_title: "Senior React Developer"
      })
    });

    const data = await res.json();
    if (res.ok) {
      console.log('Success! AI Response:', JSON.stringify(data.content, null, 2));
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

testGenerateCV();
