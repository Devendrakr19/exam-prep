import { connectDB } from "@/lib/db";
import manualQuestion from "@/models/adminmodel/questionManualModel";
import { authenticate } from "@/lib/auth";

export async function GET(req) {
  await connectDB();

  try {
    const auth = authenticate(req);

    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }
    const { user } = auth;

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const subject = searchParams.get("subject");
    const topic = searchParams.get("topic");
    const level = searchParams.get("level");

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const filter = {};
    if (category) filter.category = category;
    if (subject) filter.subject = subject;
    if (topic) filter.topic = topic;
    if (level) filter.level = level;

    const total = await manualQuestion.countDocuments(filter);

    const questions = await manualQuestion
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return Response.json(
      {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: questions,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
