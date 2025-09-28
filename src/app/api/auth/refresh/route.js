import jwt from "jsonwebtoken";
import { parse } from "cookie";

export async function POST(req) {
  try {
    const cookies = parse(req.headers.get("cookie") || "");
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return Response.json({ error: "No refresh token" }, { status: 401 });
    }

    let payload;
    try {
      payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch {
      return Response.json({ error: "Invalid refresh token" }, { status: 401 });
    }

    const accessToken = jwt.sign(
      { id: payload.id, role: payload.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // new access token
    );

    return Response.json({ accessToken }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Refresh failed" }, { status: 500 });
  }
}
