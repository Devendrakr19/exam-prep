import { authenticate } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import manualQuestion from "@/models/adminmodel/questionManualModel";

export async function POST(req) {
  await connectDB();
  try {
    const auth = await authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }
    const { user } = auth;

    let body = await req.json();

    if (!Array.isArray(body)) {
      body = [body];
    }

    const createdQuestions = [];
    const skippedQuestions = [];

    for (const item of body) {
      const { question, options, answer, category, subject, topic, level } =
        item;
      const existQuestion = await manualQuestion.findOne({
        question: question.trim(),
      });

      if (existQuestion) {
        skippedQuestions.push(question.trim());
        continue;
      }
      const newQuestion = await manualQuestion.create({
        question: question.trim(),
        options,
        answer: answer.trim(),
        category,
        subject,
        topic,
        level,
        createdBy: user._id,
      });
      createdQuestions.push(newQuestion);
    }

    if (body.length === 1 && skippedQuestions.length === 1) {
      return Response.json(
        { error: "Question already exists" },
        { status: 400 }
      );
    }

    return Response.json(
      {
        message: "Questions created",
        created: createdQuestions,
        skipped: skippedQuestions,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ error: "creation failed" }, { status: 500 });
  }
}

export async function PATCH(req) {
  await connectDB();

  try {
    const auth = await authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }
    const { user } = auth;

    let body = await req.json();
    if (Array.isArray(body)) body = body[0];

    const { _id, question, options, answer, category, subject, topic, level } =
      body;

    if (!_id) {
      return Response.json(
        { error: "Question ID is required" },
        { status: 400 }
      );
    }

    const existingQuestion = await manualQuestion.findById(_id);
    if (!existingQuestion) {
      return Response.json({ error: "Question not found" }, { status: 404 });
    }

    if (question) existingQuestion.question = question.trim();
    if (options) existingQuestion.options = options;
    if (answer) existingQuestion.answer = answer.trim();
    if (category) existingQuestion.category = category;
    if (subject) existingQuestion.subject = subject;
    if (topic !== undefined) existingQuestion.topic = topic;
    if (level) existingQuestion.level = level;

    const updatedQuestion = await existingQuestion.save();

    return Response.json(
      {
        message: "Question updated successfully",
        data: updatedQuestion,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to update question" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  await connectDB();

  try { 
    const auth = await authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    } 

    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("_id");

    if (!_id) {
      return Response.json({ error: "Question ID is required" }, { status: 400 });
    }
 
    const deletedQuestion = await manualQuestion.findByIdAndDelete(_id);

    if (!deletedQuestion) {
      return Response.json({ error: "Question not found" }, { status: 404 });
    }

    return Response.json({
      message: "Question deleted successfully",
      data: deletedQuestion,
    }, { status: 200 });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to delete question" }, { status: 500 });
  }
}

