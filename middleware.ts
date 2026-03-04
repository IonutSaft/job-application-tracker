import { auth } from "./auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export const middleware = auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/dashboard")) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  if (req.auth && req.nextUrl.pathname === "/login") {
    const newUrl = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/api/applications/:path*"],
};
