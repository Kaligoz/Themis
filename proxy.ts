import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  console.log("--- PROXY TRIGGERED ---", request.nextUrl.pathname)

  const { pathname } = request.nextUrl

  const token = request.cookies.get("better-auth.session_token")?.value || request.cookies.get("__Secure-better-auth.session_token")?.value

  console.log(`--- CHECKING PATH: ${pathname} | TOKEN FOUND: ${!!token} ---`)

  const publicRoutes = ["/auth", "/forgotPassword", "/reset-password"]
  const isPublicPage = publicRoutes.some(route => pathname.startsWith(route))

  if (!token && !isPublicPage) {
    console.log("--- REDIRECTING TO /auth ---");
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (token && isPublicPage) {
    console.log("--- REDIRECTING TO HOME ---");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/','/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)']
};