import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, mobile, password } = await req.json();

    const existUser = await User.findOne({ email });

    if (existUser) {
      return Response.json(
        { error: "User already exists" },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    return Response.json(
      { message: "User registered successfully" },
      { status: 201 }
    );

  } catch (error) {
    return Response.json(
      { error: "Signup failed" },
      {
        status: 500,
      }
    );
  }
}
