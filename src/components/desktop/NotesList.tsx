"use client";
import { setCurrentNote } from "@/redux/features/currentNoteSlice";
import { useAppDispatch } from "@/redux/store";
import { NoteType } from "@/shared/types/NoteType";
import React, { useState } from "react";

const notes: Array<NoteType> = [
	{
		_id: "1",
		title: "Testing",
		body: "Hello this is testing",
	},
	{
		_id: "2",
		title: "Bank Account",
		body: "I got 1 2 3 4 5 6 7 8 M in my bank account.",
	},
	{
		_id: "3",
		title: "223s",
		body: "What all do you want from me? AR's and them 223's Fuckin' 'round with me, you see I'm hot, I'm 500 degrees",
	},
];
const NotesList = () => {
	const [selectedNoteId, setSelectedNoteId] = useState<string>();
	const dispatch = useAppDispatch();
	const selectNote = (note: NoteType) => {
		setSelectedNoteId(note._id);
		dispatch(setCurrentNote(note));
	};
	return (
		<div className="p-2 bg-light rounded-md">
			{notes.map((note) => (
				<div key={note._id}>
					<div
						onClick={() => selectNote(note)}
						className={`px-3 py-4 rounded-md ${
							selectedNoteId === note._id ? " bg-secondary" : ""
						}`}
					>
						<h2 className="font-bold w-full overflow-hidden text-ellipsis whitespace-nowrap">
							{note.title}
						</h2>
						<p className="text-sm overflow-hidden ellipsis-1">{note.body}</p>
					</div>
					<div
						className={`w-full borderline-notes ${
							notes[notes.length - 1]._id === note._id && "hidden"
						}`}
					></div>
				</div>
			))}
		</div>
	);
};

export default NotesList;
