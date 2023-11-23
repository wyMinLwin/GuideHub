"use client";
import React, { useEffect } from "react";
import { useGetTasks } from "@/hooks/useTasks";
import { TaskType } from "@/shared/types/TaskType";
import Task from "../Task";
import MobileTaskWrapper from "../wrappers/MobileTaskWrapper";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	TasksSliceDataIndexType,
	initializeData,
} from "@/redux/features/tasksSlice";
const status:Array<TasksSliceDataIndexType> = ["todo", "inProgress", "done"];
const MobileTasksContainer = () => {
	const { data } = useGetTasks();
	const dispatch = useAppDispatch();
	const tasks = useAppSelector((state) => state.tasks);
	useEffect(() => {
		dispatch(initializeData(data));
	}, [data, dispatch]);
	return (
		<div className="w-full h-full p-0 sm:hidden overflow-hidden overflow-y-scroll">
			<div className="flex flex-wrap gap-y-2.5">
				{status.map((s) =>
					tasks[s]?.map((task: TaskType) => (
						<MobileTaskWrapper key={task._id} task={task}>
							<Task task={task} />
						</MobileTaskWrapper>
					))
				)}
			</div>
		</div>
	);
};

export default MobileTasksContainer;
