import { NextResponse } from 'next/server';

export function middleware() {
  const response = NextResponse.next();
  
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  
  return response;
}

export const config = {
  matcher: ['/mypage/:path*', '/4q-gallery', '/_next/static/:path*', '/static/:path*'],
};