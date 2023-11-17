"use client";
import React from "react";
import StoreProvider from "../wrappers/StoreProvider";
import { useAppSelector } from "@/redux/store";

const Editor = () => {
	const noteData = useAppSelector((state) => state.currentNote);
	return (
		<>
			{noteData !== null ? (
				<div className="flex flex-col gap-2">
					<span contentEditable className="text-xl font-black focus:outline-none bg-transparent">{noteData.title}</span>
					<span contentEditable className="focus:outline-none bg-transparent">{noteData.body}</span>
				</div>
			): (
				<div className="w-full h-full flex flex-col items-center justify-center gap-3">
					<h3 className="text-xl">Open a note</h3>
					<span className="text-sm text-black/50">Or</span>
					<button className="bg-bluejeans click-effect rounded-md w-fit px-3 py-1 text-light font-light">Create new note</button>
				</div>
			)}
		</>
	);
};

const NoteEditor = () => {
	return (
		<StoreProvider>
			<Editor />
		</StoreProvider>
	);
};

export default NoteEditor;
