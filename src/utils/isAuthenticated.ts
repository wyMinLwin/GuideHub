import { cookies } from "next/headers";

export const isAuthenicated = (): boolean => {
	const cookie = cookies();
	const token = cookie.get("guide-hub-token");
	if (token) return true;
	return false;
};
