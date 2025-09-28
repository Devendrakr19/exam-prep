import { authenticate } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/userModel";

export async function DELETE(req) {
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

    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("_id");

    if (!_id) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    await User.findByIdAndDelete(_id);

    return Response.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
