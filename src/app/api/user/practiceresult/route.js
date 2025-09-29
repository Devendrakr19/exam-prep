import { connectDB } from "@/lib/db";
import { authenticate } from "@/lib/auth";
import manualQuestion from "@/models/adminmodel/questionManualModel";
import TestResult from "@/models/userscoremodel/useScoreModel"; 

export async function POST(req) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }

    const userId = auth.user.id; 
    const body = await req.json();
    const { subject, answers } = body; 

    if (!subject) {
      return Response.json({ error: "Subject is required" }, { status: 400 });
    }

    if (!answers || !Array.isArray(answers)) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const questionIds = answers.map((a) => a.questionId);
    const questions = await manualQuestion.find({ _id: { $in: questionIds } });

    let result = [];
    let correctCount = 0;

    for (let ans of answers) {
      const q = questions.find((q) => q._id.toString() === ans.questionId);

      if (q) { 
        const isCorrect =
          String(q.answer).trim().toLowerCase() ===
          String(ans.answer).trim().toLowerCase();

        if (isCorrect) correctCount++;

        result.push({
          questionId: q._id,
          question: q.question,
          options: q.options,
          userAnswer: ans.answer,
          correctAnswer: q.answer,
          isCorrect,
        });
      }
    }

    const total = answers.length;
    const wrongCount = total - correctCount;

    const testResult = new TestResult({
      userId,
      subject,  
      score: correctCount,
      totalCorrect: correctCount,  
      totalWrong: wrongCount, 
      total: answers.length,
      answers: result, 
    })

    await testResult.save();

    return Response.json(
      {
        total: answers.length,
        correct: correctCount,
        wrong: answers.length - correctCount,
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
