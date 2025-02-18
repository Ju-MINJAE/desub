import { NextResponse, type NextRequest } from 'next/server';

export const middleware = (req: NextRequest) => {
  const refreshToken = req.cookies.get('refresh_token')?.value;
  // console.log('refreshToken: ', refreshToken);

  const { pathname } = req.nextUrl;
  const isAuthenticated = refreshToken && refreshToken.trim() !== '';

  if (
    !isAuthenticated &&
    (pathname.startsWith('/myInfo') || pathname.startsWith('/subscription'))
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isAuthenticated && (pathname.startsWith('/signup') || pathname.startsWith('/login'))) {
    return NextResponse.redirect(new URL('/myInfo', req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/myInfo/:path*', '/subscription/:path*', '/signup', '/login/:path*'],
};
