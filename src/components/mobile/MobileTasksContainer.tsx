"use client";
import React from "react";
import { useGetTasks } from "@/hooks/useTasks";
import { TaskType } from "@/shared/types/TaskType";
import Task from "../Task";

const MobileTasksContainer = () => {
	const getTasks = useGetTasks();
	return (
		<div className="w-full h-full p-2 bg-secondary sm:hidden overflow-y-scroll">
			<div className="flex flex-wrap gap-y-2.5">
				{getTasks?.data?.map((task: TaskType) => (
					<Task key={task._id} task={task} />
				))}
			</div>
		</div>
	);
};

export default MobileTasksContainer;
