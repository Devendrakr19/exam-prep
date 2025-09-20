import { connectDB } from "@/lib/db";
import { authenticate } from "@/lib/auth";
import manualQuestion from "@/models/adminmodel/questionManualModel";

export async function POST(req) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }

    const body = await req.json();
    const { answers } = body; 
    
    if (!answers || !Array.isArray(answers)) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
 
    const questionIds = answers.map((a) => a.questionId);
    const questions = await manualQuestion.find({ _id: { $in: questionIds } });

    let result = [];
    let correctCount = 0;
    let wrongCount = 0;

    for (let ans of answers) {
      const q = questions.find((q) => q._id.toString() === ans.questionId);
      if (q) {
        const isCorrect = q.answer === ans.answer;
        if (isCorrect) correctCount++;
        else wrongCount++;

        result.push({
          questionId: ans.questionId,
          question: q.question,
          options: q.options,
          yourAnswer: ans.answer,
          correctAnswer: q.answer,
          isCorrect,
        });
      }
    }

    return Response.json(
      {
        total: answers.length,
        correct: correctCount,
        wrong: wrongCount,
        details: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking answers:", error);
    return Response.json(
      { error: "Failed to evaluate answers" },
      { status: 500 }
    );
  }
}
