import { combineReducers } from "@reduxjs/toolkit";
import currentNoteSlice from "./features/currentNoteSlice";

export const rootReducer = combineReducers({
    currentNote: currentNoteSlice
});
