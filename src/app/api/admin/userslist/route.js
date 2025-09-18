import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import { authenticate } from "@/lib/auth";

export async function GET(req) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }

    const { user } = auth;

    if (user.role !== "admin") {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const users = await User.find().select("-password");

    return Response.json({ users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
