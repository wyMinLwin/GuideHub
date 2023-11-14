"use client";
import React, { FC, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Variants, motion } from "framer-motion";

const portalVariant: Variants = {
	close: { scale: 0 },
	open: { scale: 1 },
};

const PortalWrapper: FC<{
	children: React.ReactNode;
	portalModel: boolean;
}> = ({ children, portalModel }) => {
	const portalRef = useRef<HTMLElement | null>(null);
	useEffect(() => {
		portalRef.current = document.getElementById("portal");
	}, []);

	return (
		<>
			{portalRef.current &&
				portalModel &&
				createPortal(
					<motion.div
						initial={"close"}
						animate={portalModel ? "open" : "close"}
						variants={portalVariant}
						className="w-screen h-screen overflow-hidden z-40 bg-black/60 absolute top-0 left-0 right-0 bottom-0"
					>
						{children}
					</motion.div>,
					document.getElementById("portal") as HTMLElement
				)}
		</>
	);
};

export default PortalWrapper;
