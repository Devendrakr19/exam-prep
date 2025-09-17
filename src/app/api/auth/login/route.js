import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json(
        { error: "User not found" },
        {
          status: 404,
        }
      );
    }
    let isMatch = false;

    if (user.role === "admin") {
      isMatch = user.password === password;
    } else {
      isMatch = await bcrypt.compare(password, user.password);
    }

    if (!isMatch) {
      return Response.json(
        { error: "Invalid password" },
        {
          status: 401,
        }
      );
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return Response.json(
      {
        message: "Login successfull",
        token,
        user: { name: user.name, email: user.email, role: user.role },
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Login failed", details: error.message },
      {
        status: 500,
      }
    );
  }
}
