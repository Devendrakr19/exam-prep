import { connectDB } from "@/lib/db";
import { authenticate } from "@/lib/auth";
import User from "@/models/userModel"; 

export async function PATCH(req) {
  await connectDB();

  try { 
    const auth = await authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }

    const { user } = auth;
    if (user.role !== "admin") {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const block = searchParams.get("block");

    if (!userId) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    existingUser.blocked = block === "true";
    await existingUser.save();

    return Response.json({
      message: `User ${block === "true" ? "blocked" : "unblocked"} successfully`,
      user: existingUser,
    }, { status: 200 });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to update user" }, { status: 500 });
  }
}
