import { connectDB } from "@/lib/db";
import manualQuestion from "@/models/adminmodel/questionManualModel";
import { authenticate } from "@/lib/auth";

export async function GET(req) {
  await connectDB();

  try {
    const auth = await authenticate(req);

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

    const filter = {
      category: { $regex: category, $options: "i" },
      subject: { $regex: subject, $options: "i" },
    };
    if (topic) filter.topic = { $regex: topic, $options: "i" };
    if (level) filter.level = { $regex: level, $options: "i" };

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
