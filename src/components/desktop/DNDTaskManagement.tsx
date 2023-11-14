"use client";
import React from "react";
import { TaskType } from "@/shared/types/TaskType";
import DNDProvider from "../wrappers/DNDProvider";
import DNDContainer from "./DNDContainer";
const tasks: Array<TaskType> = [
	{
		id: "1",
		title: "GuideHub Dnd",
		body: "Need to implement drag and drop feature to Tasks for GuideHub.",
		status: "in progress",
	},
	{
		id: "3",
		title: "To Learn New Things",
		body: "Need to learn something that can improve the career.",
		status: "todo",
	},
	{
		id: "2",
		title: "To Drink Coffee",
		body: "Let me get a coffee.",
		status: "done",
	},
];

const DNDTaskManagement = () => {
	return (
		<DNDProvider>
			<DNDContainer
				tasks={tasks.filter((task) => task.status === "todo")}
				status="todo"
			/>
			<DNDContainer
				tasks={tasks.filter((task) => task.status === "in progress")}
				status="in progress"
			/>
			<DNDContainer
				tasks={tasks.filter((task) => task.status === "done")}
				status="done"
			/>
		</DNDProvider>
	);
};

export default DNDTaskManagement;
