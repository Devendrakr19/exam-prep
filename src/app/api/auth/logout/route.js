export async function POST() {
  const headers = new Headers();
  headers.append("Set-Cookie", `refreshToken=; HttpOnly; Path=/; Max-Age=0`);

  return new Response(
    JSON.stringify({ message: "Logged out successfully" }),
    { status: 200, headers }
  );
}
