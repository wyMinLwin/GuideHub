import { TaskType } from "@/shared/types/TaskType";
import { createSlice } from "@reduxjs/toolkit";

type TasksSliceType = {
	todo: Array<TaskType>;
	inProgress: Array<TaskType>;
	done: Array<TaskType>;
};

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
				actions.payload?.to as "todo" | "in progress" | "done"
			] as "todo" | "inProgress" | "done";
			const fromPath = keyValue[
				actions.payload?.from as "todo" | "in progress" | "done"
			] as "todo" | "inProgress" | "done";
			state[toPath] = [actions.payload.data as TaskType, ...state[toPath]];
			state[fromPath] = state[fromPath].filter(
				(task: TaskType) => task._id !== actions.payload.data._id
			);
		},
	},
});

export const { initializeData, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
