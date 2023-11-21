import TanStackProvider from "@/components/wrappers/TanStackProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import StoreProvider from "@/components/wrappers/StoreProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata: Metadata = {
	title: "GuideHub",
};

const ubuntu = Ubuntu({ weight: ["300"], subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={
					"w-screen h-screen overflow-hidden bg-light " + ubuntu.className
				}
			>
				<TanStackProvider>
					<ReactQueryDevtools />
					<StoreProvider>{children}</StoreProvider>
				</TanStackProvider>
				<div id="portal"></div>
			</body>
		</html>
	);
}
