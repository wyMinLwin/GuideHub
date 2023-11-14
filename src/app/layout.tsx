import "./globals.css";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

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
				{children}
				<div id="portal"></div>
			</body>
		</html>
	);
}
