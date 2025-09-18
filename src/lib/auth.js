import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { connectDB } from "./db"; 

export async function authenticate(req) {
  await connectDB();

  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return { error: "No token provided", status: 401 };
  }

  const token = authHeader.split(" ")[1];
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return { error: "Invalid token", status: 401 };
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    return { error: "User not found", status: 404 };
  }

  return { user };  
}
