import { TaskType } from "@/shared/types/TaskType";
import React, { FC } from "react";
import { useDrag } from "react-dnd";
type TaskWrapperProps = {
	task: TaskType;
	children: React.ReactNode;
};
const TaskWrapper: FC<TaskWrapperProps> = ({ task, children }) => {
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

export default TaskWrapper;
