import { TaskType } from "@/shared/types/TaskType";
import React, { FC } from "react";
import { useDrag } from "react-dnd";
type DesktopTaskWrapperProps = {
	task: TaskType;
	children: React.ReactNode;
};
const DesktopTaskWrapper: FC<DesktopTaskWrapperProps> = ({ task, children }) => {
	const [{ display }, drag] = useDrag(() => ({
		type: "TaskComponent",
		item: task,
		collect: (monitor) => {
			return {
				display: monitor.isDragging() ? "none" : "block",
			};
		},
	}));
	return (
		<div
			ref={drag}
			style={{ display }}
			className={`w-full xl:w-10/12 2xl:w-3/5`}
		>
			{children}
		</div>
	);
};

export default DesktopTaskWrapper;
