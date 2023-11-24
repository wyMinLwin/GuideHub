"use client";
import React, { useState } from "react";
import { Variants, motion } from "framer-motion";
import Image from "next/image";
import { TaskStatus } from "@/shared/types/TaskStatus";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { TaskType } from "@/shared/types/TaskType";
import { dateTimeFormatter } from "@/utils/dateTimeFormatter";
import { toggleViewDetailDialog } from "@/redux/features/currentTaskSlice";

const statusLabelGenerator = (status: TaskStatus, task: TaskType) => {
	switch (status) {
		case "todo":
			return `Created at ${dateTimeFormatter(task.createdAt)}`;
		case "in progress":
			return `In progress since ${dateTimeFormatter(task.updatedAt)}`;
		case "done":
			return `Done at ${dateTimeFormatter(task.updatedAt)}`;
		default:
			return "";
	}
};

const borderColors = {
	todo: "border-bluejeans",
	"in progress": "border-progress",
	done: "border-success",
};

const taskDetailVariant: Variants = {
	close: {
		scale: 0,
		top: "100%",
		borderRadius: 100,
	},
	open: {
		scale: 1,
		top: 0,
		borderRadius: 0,
	},
};
const TaskDetail = () => {
	const [isEdit, setIsEdit] = useState(false);
	const { currentTask, viewDetailDialog } = useAppSelector(
		(state) => state.currentTask
	);
	const dispatch = useAppDispatch();
	return (
		<motion.div
			variants={taskDetailVariant}
			initial={"close"}
			animate={viewDetailDialog ? "open" : "close"}
			transition={{ duration: 0.35 }}
			className="absolute top-0 left-0 bottom-0 right-0 bg-black/20 z-50 flex justify-center items-center"
		>
			<div className="w-11/12 sm:w-[500px] h-fit flex flex-col gap-y-3 rounded-md p-4 bg-light drop-shadow-sm">
				<div className="flex justify-between items-center">
					<h2
						className={`text-lg font-semibold pr-3 border-b-4 ${
							borderColors[currentTask?.status]
						}`}
					>
						Task Details
					</h2>
					<div className="flex justify-end gap-x-3 items-center">
						{isEdit ? (
							<Image
								onClick={() => setIsEdit((prevIsEdit) => !prevIsEdit)}
								src={"/SVGs/view-blue.svg"}
								alt="close button"
								width={24}
								height={24}
							/>
						) : (
							<Image
								onClick={() => setIsEdit((prevIsEdit) => !prevIsEdit)}
								src={"/SVGs/edit-blue.svg"}
								alt="close button"
								width={24}
								height={24}
							/>
						)}
						<Image
							src={"/SVGs/trash-error.svg"}
							alt="close button"
							width={24}
							height={24}
						/>
						<Image
							onClick={() => dispatch(toggleViewDetailDialog())}
							src={"/SVGs/close.svg"}
							alt="close button"
							width={24}
							height={24}
						/>
					</div>
				</div>
				<p
					className={`text-sm border-b-4 pr-3 w-fit ${
						borderColors[currentTask?.status]
					}`}
				>
					{statusLabelGenerator(currentTask?.status, currentTask)}
				</p>
				<div className="flex flex-col gap-1">
					<label className="text-sm">Task Title</label>
					<input
						disabled={!isEdit}
						className="w-11/12 sm:w-3/5 px-2.5 py-1.5 rounded-md border-[1px] border-secondary"
						value={"some title"}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-sm">Task Description</label>
					<textarea
						disabled={!isEdit}
						className="w-11/12 sm:w-3/5 px-2.5 py-1.5 rounded-md border-[1px] border-secondary resize-none h-24"
						value={"some description"}
					></textarea>
				</div>
			</div>
		</motion.div>
	);
};

export default TaskDetail;
