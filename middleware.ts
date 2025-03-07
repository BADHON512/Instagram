import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { cookies } = request;
  const authToken = cookies.get('session');
  const { pathname } = new URL(request.url);

  // ✅ Next.js স্ট্যাটিক ফাইল এবং API রিকোয়েস্ট middleware থেকে বাইপাস করো
  if (
    pathname.startsWith('/_next/') || 
    pathname.startsWith('/static/') || 
    pathname.startsWith('/api/')
  ) {
    return NextResponse.next();
  }

  // 🔹 লগিন না করা থাকলে শুধুমাত্র '/login' এবং '/sign-up' পেজে যেতে পারবে
  if (!authToken) {
    if (pathname.startsWith('/login') || pathname.startsWith('/sign-up')) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 🔹 লগিন করা থাকলে '/login' এবং '/sign-up' পেজে যেতে পারবে না
  if (authToken && (pathname.startsWith('/login') || pathname.startsWith('/sign-up'))) {
    return NextResponse.redirect(new URL('/', request.url)); // or redirect to any other page after login
  }

  // ✅ লগিন করা থাকলে সব রুট অ্যাক্সেস করতে পারবে
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
