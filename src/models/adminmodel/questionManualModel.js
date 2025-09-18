import mongoose, { Schema } from "mongoose";

const manualQuestionSchema = new Schema(
  {
    question: {
      type: String,
      trim: true,
      unique: true,
    },
    options: {
      type: [String],
    },
    answer: {
      type: String,
      trim: true,
    },
    category: { type: String },
    subject: { type: String },
    topic: { type: String, default: "" },
    level: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
  },
  { timestamps: true }
);

const manualQuestion =
  mongoose.models.manualQuestion ||
  mongoose.model("manualQuestion", manualQuestionSchema);

export default manualQuestion;
