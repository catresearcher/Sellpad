import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  const cookie = req.cookies.get("fgr")?.value;

  const protectedRoutes = ["/dashboard"];
  const publicRoutes = ["/login", "/register"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  let loggedIn = false;

  console.log(cookie);

  if (cookie) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
        {
          method: "GET",
          headers: {
            cookie: `fgr=${cookie}`,
          },
          credentials: "include",
        },
      );

      if (res.ok) {
        const data = await res.json();

        if (data.id) {
          loggedIn = true;
        }
      }
    } catch (err) {
      console.error("Error checking session:", err);
    }
  }

  // Not logged in trying to access protected route
  if (!loggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Logged in trying to access auth pages
  if (loggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif)).*)",
  ],
};
