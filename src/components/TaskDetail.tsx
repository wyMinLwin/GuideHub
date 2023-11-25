"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Variants, motion } from "framer-motion";
import Image from "next/image";
import { TaskStatus } from "@/shared/types/TaskStatus";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { TaskType } from "@/shared/types/TaskType";
import { dateTimeFormatter } from "@/utils/dateTimeFormatter";
import { toggleViewDetailDialog } from "@/redux/features/currentTaskSlice";
import { useDeleteTask, useUpdateTask } from "@/hooks/useTasks";
import Loading from "./global/Loading";
import { useForm } from "react-hook-form";
import { TaskForm } from "./desktop/tasks/CreateTaskButton";

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
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = useForm<TaskForm>();
	const currentTitle = watch("title");
	const currentBody = watch("body");
	const { currentTask, viewDetailDialog } = useAppSelector(
		(state) => state.currentTask
	);
	const dispatch = useAppDispatch();

	const setDefault = useCallback(() => {
		dispatch(toggleViewDetailDialog());
		setIsLoading(false);
		reset();
	}, [dispatch, reset]);

	const deleteTask = useDeleteTask(() => setDefault());

	const updateTask = useUpdateTask(true, () => setDefault());

	const deleteTaskHandler = () => {
		const payload = JSON.stringify(currentTask);
		setIsLoading(true);
		deleteTask.mutate(payload);
	};

	const saveable = useMemo(() => {
		if (currentTask) {
			const { title, body } = currentTask;
			if (title !== currentTitle || body !== currentBody) return true;
		}
	}, [currentTask, currentTitle, currentBody]);
	const submitHandler = (data: TaskForm) => {
		const payload = JSON.stringify({
			...currentTask,
			title: data.title,
			body: data.body,
		});
		setIsLoading(true);
		updateTask.mutateAsync(payload);
	};
	useEffect(() => {
		if (currentTask) {
			const { title, body } = currentTask;
			setValue("title", title);
			setValue("body", body);
		}
	}, [currentTask, setValue]);

	return (
		<motion.div
			variants={taskDetailVariant}
			initial={"close"}
			animate={viewDetailDialog ? "open" : "close"}
			transition={{ duration: 0.35 }}
			className="absolute top-0 left-0 bottom-0 right-0 bg-black/20 z-30 flex justify-center items-center"
		>
			<form
				onSubmit={handleSubmit(submitHandler)}
				className="w-11/12 sm:w-[500px] h-fit flex flex-col gap-y-3 rounded-md p-4 bg-light drop-shadow-sm"
			>
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
							onClick={() => deleteTaskHandler()}
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
					<label className="text-sm flex items-center">
						Task Title
						<div className="form-validate-message">
							{errors?.title?.message}
						</div>
					</label>
					<input
						{...register("title", {
							required: { value: true, message: "Task title required." },
						})}
						disabled={!isEdit}
						className="w-11/12 sm:w-9/12 px-2.5 py-1.5 rounded-md border-[1px] border-secondary"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-sm flex items-center">
						Task Description
						<div className="form-validate-message">{errors?.body?.message}</div>
					</label>
					<textarea
						{...register("body", {
							required: { value: true, message: "Task description required." },
						})}
						disabled={!isEdit}
						className="w-11/12 sm:w-9/12 px-2.5 py-1.5 rounded-md border-[1px] border-secondary resize-none h-24"
					></textarea>
				</div>
				<input
					type="submit"
					value="Save"
					disabled={!saveable}
					className={`${
						!saveable ? "bg-black/30" : "bg-success"
					} px-8 py-1.5 rounded-md text-light w-fit mx-auto click-effect`}
				/>
			</form>
			<Loading isLoading={isLoading} />
		</motion.div>
	);
};

export default TaskDetail;
