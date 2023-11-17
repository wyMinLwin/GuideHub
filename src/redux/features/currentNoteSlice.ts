import { NoteType } from "@/shared/types/NoteType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: NoteType = null!;

const currentNoteSlice = createSlice({
	name: "CurrentNoteSlice",
	initialState,
	reducers: {
        setCurrentNote(state,actions) {
            return actions.payload as NoteType
        },
        setToDefaultNote() {
            return null!
        }
    },
});

export const {setCurrentNote,setToDefaultNote} = currentNoteSlice.actions;
export default currentNoteSlice.reducer;
