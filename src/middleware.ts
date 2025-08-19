import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("__Secure-next-auth.session-token") ?? req.cookies.get("next-auth.session-token");
  const token = sessionCookie?.value;
  const authorized = Boolean(token);
  const { pathname } = req.nextUrl;


  if (!authorized && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  if (authorized && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
