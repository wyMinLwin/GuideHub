import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Teko } from "next/font/google";
import SideBarToggle from "./mobile/SideBarToggle";
import { UserInfoType } from "@/shared/types/UserInfoType";
import NameButton from "./NameButton";
const teko = Teko({ subsets: ["latin"] });

const getUserInfo = async (): Promise<UserInfoType> =>  {
	const res = await import("@/app/api/auth/me/route");
	const result = await res.GET();
	const userData = await result.json();
	return userData;
};

const Header = async () => {
	const data = await getUserInfo();
	
	return (
		<header className="grow-0 bg-light drop-shadow-sm z-10">
			<nav className="w-full px-4 lg:px-20 py-2 gap-x-3 sm:gap-x-6 flex items-center">
				<SideBarToggle />
				<Link href={"/"} className="flex items-end gap-x-2">
					<Image
						src={"/SVGs/robot.svg"}
						alt="GuideHub logo"
						priority
						width={40}
						height={40}
					/>
					<h1 className={"text-2xl tracking-wider " + teko.className}>
						GuideHub
					</h1>
				</Link>
				<NameButton name={data.name} />
			</nav>
		</header>
	);
};

export default Header;
