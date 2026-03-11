import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma";
import { authMiddleware, unauthorizedResponse } from "@/shared/middleware/auth";
import { GenerateService } from "@/modules/generate/generate.service";
import { buildCVPrompt } from "@/modules/generate/prompts/cv.prompt";

export async function POST(req) {
  const user = await authMiddleware(req);
  if (!user) return unauthorizedResponse();

  try {
    const { profile_id, job_description, company_name, job_title } = await req.json();

    if (!profile_id || !job_description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Fetch the profile data
    const profile = await prisma.profile.findFirst({
      where: { id: profile_id, user_id: user.id, deleted_at: null },
      include: {
        experiences: { where: { deleted_at: null } },
        skills: true,
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // 2. Build the job submission record
    const submission = await prisma.jobSubmission.create({
      data: {
        user_id: user.id,
        profile_id,
        company_name,
        job_title,
        description: job_description,
      },
    });

    // 3. Generate the CV content using Gemini
    const prompt = buildCVPrompt(profile, job_description);
    const aiContent = await GenerateService.generate(prompt);

    // 4. Save the generated document
    const document = await prisma.generatedDocument.create({
      data: {
        user_id: user.id,
        job_submission_id: submission.id,
        type: 'cv',
        content: aiContent,
      },
    });

    return NextResponse.json({
      submission_id: submission.id,
      document_id: document.id,
      content: aiContent
    });

  } catch (error) {
    console.error("Generate CV Error:", error);
    return NextResponse.json({ error: "Failed to generate tailored CV" }, { status: 500 });
  }
}
