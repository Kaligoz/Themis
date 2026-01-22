import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.') 
  ) {
    return NextResponse.next();
  }

  const sessionToken = 
    request.cookies.get("better-auth.session_token") || 
    request.cookies.get("__Secure-better-auth.session_token")

  const isAuthPage = pathname === "/auth"

  if (isAuthPage || sessionToken) {
    if (sessionToken && isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL("/auth", request.url))
}

export const config = {
  matcher: [
    '/:path*',
  ],
};