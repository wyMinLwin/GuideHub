import { combineReducers } from "@reduxjs/toolkit";
import currentNoteSlice from "./features/currentNoteSlice";
import tasksSlice from "./features/tasksSlice";
import currentTaskSlice from "./features/currentTaskSlice";

export const rootReducer = combineReducers({
	currentNote: currentNoteSlice,
	tasks: tasksSlice,
	currentTask: currentTaskSlice,
});
