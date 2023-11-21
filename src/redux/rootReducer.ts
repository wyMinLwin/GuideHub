import { combineReducers } from "@reduxjs/toolkit";
import currentNoteSlice from "./features/currentNoteSlice";
import tasksSlice from "./features/tasksSlice";

export const rootReducer = combineReducers({
	currentNote: currentNoteSlice,
	tasks: tasksSlice,
});
