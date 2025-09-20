// import { connectDB } from "@/lib/db";
// import TestResult from "@/models/testResultModel";

// export async function GET(req, { params }) {
//   await connectDB();

//   try {
//     const { userId } = params;

//     // fetch all test results for the user
//     const results = await TestResult.find({ userId }).lean();

//     if (!results || results.length === 0) {
//       return new Response(
//         JSON.stringify({ message: "No test results found", results: [] }),
//         { status: 404 }
//       );
//     }

//     // calculate overall score
//     const totalScore = results.reduce((acc, r) => acc + r.score, 0);
//     const totalQuestions = results.reduce((acc, r) => acc + r.total, 0);
//     const overallPercentage =
//       totalQuestions > 0 ? ((totalScore / totalQuestions) * 100).toFixed(2) : 0;

//     return new Response(
//       JSON.stringify({
//         results, // all test scores
//         overall: {
//           totalTests: results.length,
//           totalScore,
//           totalQuestions,
//           overallPercentage,
//         },
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     return new Response(JSON.stringify({ message: error.message }), {
//       status: 500,
//     });
//   }
// }
