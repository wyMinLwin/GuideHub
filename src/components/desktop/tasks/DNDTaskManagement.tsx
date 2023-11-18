"use client";
import React from "react";
import { TaskType } from "@/shared/types/TaskType";
import DNDProvider from "../../wrappers/DNDProvider";
import DNDContainer from "./DNDContainer";
import TanStackProvider from "../../wrappers/TanStackProvider";
import { useGetTasks } from "@/hooks/useTasks";

const DNDTasks = () => {
	const getTasks = useGetTasks();
	return (
		<DNDProvider>
			<DNDContainer
				tasks={getTasks?.data?.filter(
					(task: TaskType) => task.status === "todo"
				)}
				status="todo"
			/>
			<DNDContainer
				tasks={getTasks?.data?.filter(
					(task: TaskType) => task.status === "in progress"
				)}
				status="in progress"
			/>
			<DNDContainer
				tasks={getTasks?.data?.filter(
					(task: TaskType) => task.status === "done"
				)}
				status="done"
			/>
		</DNDProvider>
	);
};

const DNDTaskManagement = () => {
	return (
		<TanStackProvider>
			<DNDTasks />
		</TanStackProvider>
	);
};

export default DNDTaskManagement;
