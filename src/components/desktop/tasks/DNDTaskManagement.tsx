"use client";
import React, { useEffect, useState } from "react";
import DNDProvider from "../../wrappers/DNDProvider";
import DNDContainer from "./DNDContainer";
import { useGetTasks } from "@/hooks/useTasks";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { initializeData } from "@/redux/features/tasksSlice";

const DNDTaskManagement = () => {
	const { data } = useGetTasks();
	const tasks = useAppSelector((state) => state.tasks);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(initializeData(data));
	}, [data, dispatch]);
	return (
		<DNDProvider>
			<DNDContainer tasks={tasks.todo} status="todo" />
			<DNDContainer tasks={tasks.inProgress} status="in progress" />
			<DNDContainer tasks={tasks.done} status="done" />
		</DNDProvider>
	);
};

export default DNDTaskManagement;
