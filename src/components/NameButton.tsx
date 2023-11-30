"use client";
import React, { FC, useCallback } from "react";
import { Variants, motion, useCycle } from "framer-motion";
import { useClickOutside } from "@/hooks/useClickOutside";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

const settingVariant: Variants = {
	close: {
		scale: 0,
	},
	open: {
		scale: 1,
	},
};

const NameButton: FC<{ name: string }> = ({ name }) => {
	const router = useRouter();
	const [settingDialog, toggleSettingDialog] = useCycle(false, true);
	const [logoutDialog, toggleLogoutDialog] = useCycle(false, true);
	const ref = useClickOutside(() => toggleSettingDialog(0));
	const cookies = useCookies();
	const logoutHandler = useCallback(() => {
		cookies.remove("guide-hub-token");
		toggleLogoutDialog();
		toggleSettingDialog();
		router.push("/login");
	}, [toggleLogoutDialog, toggleSettingDialog, router, cookies]);
	return (
		<div className="ml-auto relative" ref={ref}>
			<div
				onClick={() => toggleSettingDialog()}
				className="w-10 h-10 bg-bluejeans ml-auto cursor-pointer select-none text-light rounded-full flex items-center justify-center"
			>
				{name[0].toUpperCase()}
			</div>
			<motion.div
				variants={settingVariant}
				initial={"close"}
				animate={settingDialog ? "open" : "close"}
				className="absolute top-[100%] right-0 w-[180px] py-3 px-2 bg-light name-button-shadow rounded-md"
			>
				<button
					onClick={() => toggleLogoutDialog()}
					className="w-full flex items-center gap-x-2 p-2 rounded-md hover:bg-secondary/60"
				>
					<Image
						src={"/SVGs/logout.svg"}
						alt="logout button"
						width={20}
						height={20}
					/>
					<span>Logout</span>
				</button>
			</motion.div>
			<motion.div
				variants={settingVariant}
				initial={"close"}
				animate={logoutDialog ? "open" : "close"}
				className="fixed w-screen h-screen top-0 left-0 right-0 bottom-0 bg-black/30 flex justify-center items-center"
			>
				<div className="bg-light rounded-md w-[400px] py-3 px-2">
					<h2 className="text-center text-lg font-semibold">
						Are you sure you want to logout?
					</h2>
					<div className="grid grid-cols-2 gap-x-3 mt-4">
						<button
							onClick={() => toggleLogoutDialog()}
							className="ml-auto w-fit px-3 py-1 rounded-md bg-gray-400 text-light"
						>
							Cancel
						</button>
						<button
							onClick={() => logoutHandler()}
							className="mr-auto w-fit px-3 py-1 rounded-md bg-error text-light"
						>
							Logout
						</button>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default NameButton;
