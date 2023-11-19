"use client";
import Button from "@/components/global/Button";
import React, { useCallback } from "react";
import { Variants, motion, useCycle } from "framer-motion";
import { useForm } from "react-hook-form";
import { useCreateTask } from "@/hooks/useTasks";

const createTaskDialogVariant: Variants = {
	close: {
		scale: 0,
		borderRadius: "50%",
		width: 0,
		height: 0,
		x: "-50%",
		y: "-50%",
	},
	open: {
		scale: 1,
		borderRadius: 0,
		width: "100vw",
		height: "100vh",
		x: "-50%",
		y: "-50%",
	},
};

interface TaskForm {
	title: string;
	body: string;
}

const CreateTaskButton = () => {
	const [isCreateTaskDialogOpen, toggleCreateTaskDialog] = useCycle(
		false,
		true
	);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TaskForm>();
	const resetDefault = useCallback(() => {
		toggleCreateTaskDialog();
		reset();
	}, [toggleCreateTaskDialog, reset]);
	const createTask = useCreateTask(() => resetDefault());
	const submitHandler = (data: TaskForm) => {
		const taskBody = JSON.stringify(data);
		createTask.mutateAsync(taskBody);
	};

	return (
		<>
			<Button
				onClick={() => toggleCreateTaskDialog()}
				label="Create New Task"
				icon="plus-light"
				cn="bg-bluejeans text-light"
			/>
			<motion.div
				initial={"close"}
				animate={isCreateTaskDialogOpen ? "open" : "close"}
				variants={createTaskDialogVariant}
				className="absolute z-20 top-1/2 left-1/2 w-screen h-screen bg-black/30"
			>
				<div className="absolute flex flex-col gap-3 z-30 top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 w-11/12 sm:w-[500px] bg-light rounded-lg p-4">
					<h2 className="font-bold text-center text-lg">Create New Task</h2>
					{errors && (
						<div className="form-validate-message ">
							{Object.values(errors)[0]?.message}
						</div>
					)}
					<form
						onSubmit={handleSubmit(submitHandler)}
						className="flex flex-col gap-y-2"
					>
						<input
							{...register("title", {
								required: { value: true, message: "Task title required." },
							})}
							placeholder="Enter Task Title"
							className="px-4 py-2.5 rounded-md"
						/>
						<textarea
							{...register("body", {
								required: {
									value: true,
									message: "Task description required.",
								},
							})}
							placeholder="Enter Task Description"
							className="px-4 py-2.5 rounded-md resize-none"
						></textarea>
						<div className="flex justify-end gap-x-2">
							<button
								onClick={() => resetDefault()}
								className="bg-error w-fit click-effect text-light px-4 py-1.5 rounded-md"
								type="button"
							>
								Cancel
							</button>
							<input
								type="submit"
								value="Create"
								className="bg-success w-fit click-effect text-light px-4 py-1.5 rounded-md"
							/>
						</div>
					</form>
				</div>
			</motion.div>
		</>
	);
};

export default CreateTaskButton;
