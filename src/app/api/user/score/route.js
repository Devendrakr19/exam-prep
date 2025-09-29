import { connectDB } from "@/lib/db"; 
import TestResult from "@/models/userscoremodel/useScoreModel";

export async function GET(req) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId"); // get userId from query

    if (!userId) {
      return new Response(
        JSON.stringify({ message: "userId is required" }),
        { status: 400 }
      );
    }

    // fetch all test results for the user
    const results = await TestResult.find({ userId }).lean();

    if (!results || results.length === 0) {
      return new Response(
        JSON.stringify({ message: "No test results found", results: [] }),
        { status: 404 }
      );
    }

    // calculate overall score
    const totalScore = results.reduce((acc, r) => acc + r.score, 0);
    const totalQuestions = results.reduce((acc, r) => acc + r.total, 0); 
    const totalCorrect = results.reduce((acc, r) => acc + r.totalCorrect, 0);
    const totalWrong = results.reduce((acc, r) => acc + r.totalWrong, 0);
    const overallPercentage =
      totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(2) : 0;

    return new Response(
      JSON.stringify({
        results, // all test scores
        overall: {
          totalTests: results.length,
          totalScore,
          totalQuestions,
          totalCorrect,
          totalWrong,
          overallPercentage,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
