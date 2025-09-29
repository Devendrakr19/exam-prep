const mongoose = require("mongoose");

const testResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true }, 
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  totalCorrect: { type: Number, required: true },
  totalWrong: { type: Number, required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "manualQuestion" },
      question: String,
      options: [String],
      userAnswer: String,
      correctAnswer: String,
      isCorrect: Boolean,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});


const TestResult = mongoose.models.TestResult || mongoose.model("TestResult", testResultSchema);

export default TestResult; 
