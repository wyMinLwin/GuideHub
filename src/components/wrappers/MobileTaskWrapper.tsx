"use client";
import React, { FC } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { TaskType } from "@/shared/types/TaskType";
import { useAppDispatch } from "@/redux/store";
import { moveTask, deleteTaskState } from "@/redux/features/tasksSlice";
import { useDeleteTask, useUpdateTask } from "@/hooks/useTasks";
import Button from "../global/Button";

type MoveTaskType = "delete" | "todo" | "in progress" | "done";

const buttonSettings = {
	todo: {
		bg: ["#ED5565", "#FFAA33"],
		button: ["trash-light", "in-progress-light"],
		func: ["delete", "in progress"],
	},
	"in progress": {
		bg: ["#5D9CEC", "#7CD197"],
		button: ["revert-light", "check-light"],
		func: ["todo", "done"],
	},
	done: {
		bg: ["#FFAA33", "#ED5565"],
		button: ["in-progress-light", "trash-light"],
		func: ["in progress", "delete"],
	},
};

interface MobileTaskWrapperProps {
	task: TaskType;
	children: React.ReactNode;
}

const MobileTaskWrapper: FC<MobileTaskWrapperProps> = ({ children, task }) => {
	const dispatch = useAppDispatch();
	const updateTask = useUpdateTask();
	const deleteTask = useDeleteTask();
	const buttonSettingIndex = buttonSettings[task.status];
	const x = useMotionValue(0);
	const xArea = [-1, 0, 1];
	const background = useTransform(x, xArea, [
		buttonSettingIndex.bg[1],
		"#F2F2F2",
		buttonSettingIndex.bg[0],
	]);
	const dragHandler = () => {
		if ((x.get() > 0 && x.get() < 80) || (x.get() < 0 && x.get() > -80)) {
			x.setWithVelocity(x.getPrevious(), 0, 5000);
		}
	};
	const moveTaskHandler = (
		funcType: "delete" | "todo" | "in progress" | "done"
	) => {
		if (funcType !== "delete") {
			const newObj: TaskType = { ...task, status: funcType };
			const body = JSON.stringify(newObj);
			dispatch(moveTask({ data: newObj, to: funcType, from: task.status }));
			updateTask.mutateAsync(body);
		} else {
			dispatch(deleteTaskState({ data: task }));
			const body = JSON.stringify(task);
			deleteTask.mutateAsync(body);
		}
	};
	return (
		<motion.div
			style={{ background }}
			className="w-full relative drop-shadow-sm rounded-sm"
		>
			<Button
				onClick={() =>
					moveTaskHandler(buttonSettingIndex.func[0] as MoveTaskType)
				}
				label=""
				iconSize={30}
				icon={buttonSettingIndex.button[0]}
				cn="absolute z-0 top-0 left-0  h-full w-[80px] rounded-sm"
			/>
			<Button
				onClick={() =>
					moveTaskHandler(buttonSettingIndex.func[1] as MoveTaskType)
				}
				label=""
				iconSize={30}
				icon={buttonSettingIndex.button[1]}
				cn="absolute z-0 top-0 right-0  h-full w-[80px] rounded-sm"
			/>
			<motion.div
				drag="x"
				style={{ x }}
				className="cursor-pointer w-full z-20"
				dragConstraints={{ left: -80, right: 80 }}
				dragTransition={{ bounceDamping: 15 }}
				dragMomentum={false}
				onDragEnd={() => dragHandler()}
			>
				{children}
			</motion.div>
		</motion.div>
	);
};

export default MobileTaskWrapper;
