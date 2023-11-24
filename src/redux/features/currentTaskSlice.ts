import { TaskType } from "@/shared/types/TaskType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
	currentTask: TaskType;
	viewDetailDialog: boolean;
} = {
	currentTask: null!,
	viewDetailDialog: false,
};

const currentTaskSlice = createSlice({
	name: "CurrentTaskSlice",
	initialState,
	reducers: {
		setCurrentTask(state, actions) {
			state.currentTask = actions.payload.task as TaskType;
			return state;
		},
		toggleViewDetailDialog(state) {
			state.viewDetailDialog = !state.viewDetailDialog;
			return state;
		},
	},
});

export const { setCurrentTask, toggleViewDetailDialog } =
	currentTaskSlice.actions;
export default currentTaskSlice.reducer;
