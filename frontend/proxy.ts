import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("fgr")?.value;
  const adminToken = req.cookies.get("fgra")?.value;

  const { pathname } = req.nextUrl;

  // Routes accessible without auth
  const publicPaths = ["/login", "/register"];

  // Routes requiring admin auth
  const protectedPaths = ["/dashboard"];

  const isPublic = publicPaths.includes(pathname);

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // Not logged in → redirect protected routes
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Logged in users shouldn't access auth pages
  if (token && isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp)$).*)",
  ],
};
