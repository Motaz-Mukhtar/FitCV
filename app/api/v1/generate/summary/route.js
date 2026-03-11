import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma";
import { authMiddleware, unauthorizedResponse } from "@/shared/middleware/auth";
import { GenerateService } from "@/modules/generate/generate.service";
import { buildSummaryPrompt } from "@/modules/generate/prompts/summary.prompt";

export async function POST(req) {
  const user = await authMiddleware(req);
  if (!user) return unauthorizedResponse();

  try {
    const { profile_id, job_description } = await req.json();

    if (!profile_id || !job_description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const profile = await prisma.profile.findFirst({
      where: { id: profile_id, user_id: user.id, deleted_at: null },
      include: {
        skills: true,
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // 1. Create a submission if none exists for this context (optional, but good for history)
    const submission = await prisma.jobSubmission.create({
      data: {
        user_id: user.id,
        profile_id,
        description: job_description,
      },
    });

    // 2. Build the summary prompt and generate content
    const prompt = buildSummaryPrompt(profile, job_description);
    const aiContent = await GenerateService.generate(prompt);

    // 3. Save the generated document
    const document = await prisma.generatedDocument.create({
      data: {
        user_id: user.id,
        job_submission_id: submission.id,
        type: 'summary',
        content: aiContent,
      },
    });

    return NextResponse.json({
      submission_id: submission.id,
      document_id: document.id,
      content: aiContent
    });

  } catch (error) {
    console.error("Generate Summary Error:", error);
    return NextResponse.json({ error: "Failed to generate tailored summary" }, { status: 500 });
  }
}
