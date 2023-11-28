import Header from "@/components/Header";
import DesktopSideBar from "@/components/desktop/DesktopSideBar";
import React from "react";

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="w-full h-full flex flex-col">
			<Header />
			<div className="grow overflow-hidden grid grid-cols-12">
				<aside className="hidden bg-light drop-shadow-sm col-span-2 lg:flex flex-col py-3 gap-y-3 h-full overflow-x-hidden overflow-y-scroll">
					<DesktopSideBar />
				</aside>
				<div className="col-span-12 lg:col-span-10 p-3 h-full overflow-hidden">
					{children}
				</div>
			</div>
		</main>
	);
}
