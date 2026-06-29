import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('refresh_token')?.value || request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const isAuthPage = pathname.startsWith('/auth');

    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/users/:path*',
        '/blog/:path*',
        '/auth/:path*',
    ],
};
