"use client";
import React, { FC } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { TaskType } from "@/shared/types/TaskType";
import Image from "next/image";

const buttonSettings = {
    "todo": {
        "bg":["#ED5565","#FFAA33"],
        "button":["trash-light","in-progress-light"]
    },
    "in progress": {
        "bg":["#5D9CEC","#7CD197"],
        "button":["task-light","check-light"]
    },
    "done": {
        "bg":["#FFAA33","#ED5565"],
        "button":["in-progress-light","trash-light"]
    }
}

interface MobileTaskWrapperProps {
    task:TaskType
    children:React.ReactNode
}

const MobileTaskWrapper: FC<MobileTaskWrapperProps> = ({ children,task }) => {
    const buttonSettingIndex = buttonSettings[task.status]
	const x = useMotionValue(0);
	const xInput = [-1, 0, 1];
	const background = useTransform(x, xInput, [buttonSettingIndex.bg[1], "#F2F2F2", buttonSettingIndex.bg[0]]);
	const dragHandler = () => {
        if (x.get() > 0 && x.get() < 80) {
            x.setWithVelocity(x.getPrevious(),0,5000)
        } else if (x.get() < 0 && x.get() > -80) {
            x.setWithVelocity(x.getPrevious(),0,5000)
        }
    }
	return (
		<motion.div
			style={{ background }}
			className="w-full relative drop-shadow-sm rounded-sm"
		>
			<button className="absolute z-0 top-0 left-0  h-full w-[80px] rounded-sm flex justify-center items-center">
                <Image src={`/SVGs/${buttonSettingIndex.button[0]}.svg`} alt={''} width={30} height={30} />
            </button>
			<button className="absolute z-0 top-0 right-0  h-full w-[80px] rounded-sm flex justify-center items-center">
                <Image src={`/SVGs/${buttonSettingIndex.button[1]}.svg`} alt={''} width={30} height={30} />
            </button>
			<motion.div
				drag="x"
				style={{ x }}
				className="cursor-pointer w-full z-20"
				dragConstraints={{ left: -80, right: 80 }}
				dragTransition={{ bounceDamping: 15 }}
                dragMomentum={false}
                onDragEnd={() => dragHandler()}
			>
				{children}
			</motion.div>
		</motion.div>
	);
};

export default MobileTaskWrapper;
