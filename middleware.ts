export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard/:path*"] };

// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import type { NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   if (!token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
//   return NextResponse.next();
// }
