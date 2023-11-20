import { TaskStatus } from "@/shared/types/TaskStatus";
import { TaskType } from "@/shared/types/TaskType";
import React, { FC } from "react";
import Task from "../../Task";
import { useDrop } from "react-dnd";
import TaskWrapper from "../../wrappers/TaskWrapper";

type DNDContainerProps = {
	tasks: Array<TaskType>;
	status: TaskStatus;
};

const changeStatus = (task: TaskType, status: TaskStatus) => {
	task.status !== status && console.log(task, status);
};

const DNDContainer: FC<DNDContainerProps> = ({ tasks, status }) => {
	const [{ isOver }, drop] = useDrop(() => ({
		accept: "TaskComponent",
		drop: (task: TaskType) => changeStatus(task, status),
		collect: (monitor) => ({
			isOver: monitor.isOver() && monitor.getItem().status !== status,
		}),
	}));
	return (
		<div
			ref={drop}
			className={`h-full w-full overflow-y-scroll drop-shadow-sm p-3 flex flex-col content-start gap-2 transition-transform duration-200 
            ${isOver ? "bg-bluejeans/20" : "bg-secondary"} `}
		>
			{tasks?.map((task) => (
				<TaskWrapper task={task} key={task._id}>
					<Task key={task._id} task={task} />
				</TaskWrapper>
			))}
		</div>
	);
};

export default DNDContainer;
