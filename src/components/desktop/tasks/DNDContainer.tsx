"use client";
import { TaskStatus } from "@/shared/types/TaskStatus";
import { TaskType } from "@/shared/types/TaskType";
import React, { FC } from "react";
import Task from "../../Task";
import { useDrop } from "react-dnd";
import DesktopTaskWrapper from "../../wrappers/DesktopTaskWrapper";
import { useUpdateTask } from "@/hooks/useTasks";
import { useAppDispatch } from "@/redux/store";
import { moveTask } from "@/redux/features/tasksSlice";

type DNDContainerProps = {
	tasks: Array<TaskType>;
	status: TaskStatus;
};

const DNDContainer: FC<DNDContainerProps> = ({ tasks, status }) => {
	const updateTask = useUpdateTask(false);
	const dispatch = useAppDispatch();
	const moveTaskHandler = (task: TaskType, status: TaskStatus) => {
		const newObj = { ...task, status, updatedAt: new Date().toString() };
		const body = JSON.stringify(newObj);
		dispatch(moveTask({ data: newObj, to: status, from: task.status }));
		updateTask.mutateAsync(body);
	};
	const changeStatus = (task: TaskType, status: TaskStatus) => {
		task.status !== status && moveTaskHandler(task, status);
	};
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
				<DesktopTaskWrapper task={task} key={task._id}>
					<Task key={task._id} task={task} />
				</DesktopTaskWrapper>
			))}
		</div>
	);
};

export default DNDContainer;
