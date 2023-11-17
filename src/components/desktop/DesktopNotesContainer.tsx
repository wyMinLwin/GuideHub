import React from "react";
import NoteEditor from "./NoteEditor";
import NotesList from "./NotesList";

const DesktopNotesContainer = () => {
	return (
		<div className="hidden sm:grid grid-cols-12 gap-2 h-full px-2 grow">
			<div className="col-span-4 lg:col-span-3 bg-secondary h-full p-2">
				<NotesList />
			</div>
			<div className="col-span-8 lg:col-span-9 bg-secondary h-full p-2">
				<NoteEditor />
			</div>
		</div>
	);
};

export default DesktopNotesContainer;
 