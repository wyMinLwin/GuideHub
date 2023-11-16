import { NextRequest, NextResponse } from "next/server";
import { isAuthenicated } from "./utils";

const protectedRoutes = ["/", "/tasks"];
export default function middleware(request: NextRequest) {
	if (!isAuthenicated() && protectedRoutes.includes(request.nextUrl.pathname)) {
		const absoluteURL = new URL("/login", request.nextUrl.origin);
		return NextResponse.redirect(absoluteURL.toString());
	}
}
