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

  const publicRoutes = ["/auth", "/forgotPassword", "/reset-password"];
  const isPublicPage = publicRoutes.some(route => pathname.startsWith(route));

  if (isPublicPage || sessionToken) {
    if (sessionToken && isPublicPage) {
      return NextResponse.redirect(new URL("/", request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL("/auth", request.url))
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};