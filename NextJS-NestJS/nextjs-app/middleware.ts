import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const isAuthPage = pathname.startsWith('/auth');

    // Chưa có token và không phải trang auth → redirect về login
    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Đã có token mà vào trang auth → redirect về trang chính
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// Các route cần bảo vệ (middleware sẽ chạy trên các route này)
export const config = {
    matcher: [
        '/',
        '/users/:path*',
        '/blog/:path*',
        '/auth/:path*',
    ],
};
