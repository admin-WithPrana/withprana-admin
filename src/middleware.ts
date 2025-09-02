import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("__Secure-next-auth.session-token") ?? req.cookies.get("next-auth.session-token");
  const token = sessionCookie?.value;
  const authorized = Boolean(token);
  const { pathname } = req.nextUrl;

   if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  if(authorized && pathname=='/'){
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }else if(!authorized && pathname=='/'){
        return NextResponse.redirect(new URL("/login", req.nextUrl.origin));

  }

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
    "/((?!api|_next|favicon.ico).*)",
  ],
};

