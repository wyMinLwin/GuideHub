import { TaskStatus } from "@/shared/types/TaskStatus";
import { TaskType } from "@/shared/types/TaskType";
import { createSlice } from "@reduxjs/toolkit";

type TasksSliceType = {
	todo: Array<TaskType>;
	inProgress: Array<TaskType>;
	done: Array<TaskType>;
};

export type TasksSliceDataIndexType = "todo" | "inProgress" | "done";

const initialState: TasksSliceType = {
	todo: [],
	inProgress: [],
	done: [],
};

const keyValue = {
	todo: "todo",
	"in progress": "inProgress",
	done: "done",
};

const tasksSlice = createSlice({
	name: "TasksSlice",
	initialState,
	reducers: {
		initializeData(state, actions) {
			state.todo = actions?.payload?.filter(
				(task: TaskType) => task.status === "todo"
			);
			state.inProgress = actions?.payload?.filter(
				(task: TaskType) => task.status === "in progress"
			);
			state.done = actions?.payload?.filter(
				(task: TaskType) => task.status === "done"
			);
		},
		moveTask(state, actions) {
			const toPath = keyValue[
				actions.payload?.to as TaskStatus
			] as TasksSliceDataIndexType;
			const fromPath = keyValue[
				actions.payload?.from as TaskStatus
			] as TasksSliceDataIndexType;
			state[toPath] = [...state[toPath], actions.payload.data as TaskType];
			state[fromPath] = state[fromPath].filter(
				(task: TaskType) => task._id !== actions.payload.data._id
			);
		},
		deleteTaskState(state, actions) {
			const { status, _id } = actions.payload.data;
			const statusKey = status as TaskStatus;
			const dataIndex = keyValue[statusKey] as TasksSliceDataIndexType;

			state[dataIndex] = (state[dataIndex] || []).filter(
				(task) => task._id !== _id
			);
		},
	},
});

export const { initializeData, moveTask, deleteTaskState } = tasksSlice.actions;
export default tasksSlice.reducer;
