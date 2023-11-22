"use client";
import React from "react";
import { useGetTasks } from "@/hooks/useTasks";
import { TaskType } from "@/shared/types/TaskType";
import Task from "../Task";
import MobileTaskWrapper from "../wrappers/MobileTaskWrapper";
const status = ["todo","in progress","done"]
const MobileTasksContainer = () => {
	const getTasks = useGetTasks();
	return (
		<div className="w-full h-full p-0 sm:hidden overflow-hidden overflow-y-scroll">
			<div className="flex flex-wrap gap-y-2.5">
				{
					status.map(status => (
						getTasks?.data?.filter((task:TaskType) => task.status === status)?.map((task: TaskType) => (
							<MobileTaskWrapper key={task._id} task={task}>
								<Task task={task} />
							</MobileTaskWrapper>
						))
					))
				}
			</div>
		</div>
	);
};

export default MobileTasksContainer;
