import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { kindeAuth: string } },
) {
  const endpoint = params.kindeAuth;
  return handleAuth(request, endpoint);
}
