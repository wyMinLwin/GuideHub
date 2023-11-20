"use client";
import React, { FC } from "react";
import PortalWrapper from "../wrappers/PortalWrapper";
import { motion } from "framer-motion";
const Loading: FC<{ isLoading: boolean }> = ({ isLoading }) => {
	return (
		<PortalWrapper portalModel={isLoading}>
			<div className="w-full h-full flex justify-center items-center">
				<div className="flex justify-center gap-x-8">
					<motion.div
						className="w-5 h-5 bg-light"
						animate={{
							scale: [1, 1.5, 1.5, 1],
							rotate: [0, 0, 180, 180],
							borderRadius: ["0%", "0%", "50%", "50%"],
						}}
						transition={{
							duration: 1.5,
							ease: "easeInOut",
							// times: [0, 0.2, 0.5, 0.8],
							repeat: Infinity,
							repeatDelay: 3,
						}}
					/>
					<motion.div
						className="w-5 h-5 bg-light"
						animate={{
							scale: [1, 1.5, 1.5, 1],
							rotate: [0, 0, 180, 180],
							borderRadius: ["0%", "0%", "50%", "50%"],
						}}
						transition={{
							delay: 1.5,
							duration: 1.5,
							ease: "easeInOut",
							// times: [0, 0.2, 0.5, 0.8],
							repeat: Infinity,
							repeatDelay: 3,
						}}
					/>
					<motion.div
						className="w-5 h-5 bg-light"
						animate={{
							scale: [1, 1.5, 1.5, 1],
							rotate: [0, 0, 180, 180],
							borderRadius: ["0%", "0%", "50%", "50%"],
						}}
						transition={{
							delay: 3,
							duration: 1.5,
							ease: "easeInOut",
							// times: [0, 0.2, 0.5, 0.8],
							repeat: Infinity,
							repeatDelay: 3,
						}}
					/>
				</div>
			</div>
		</PortalWrapper>
	);
};

export default Loading;
