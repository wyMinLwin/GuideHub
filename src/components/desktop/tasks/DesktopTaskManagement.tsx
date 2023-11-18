import React from "react";
import DNDTaskManagement from "./DNDTaskManagement";

const DesktopTaskManagement = () => {
	return (
		<div className="w-full h-full hidden sm:flex flex-col px-3">
			<div className="grid grid-cols-3 grow-0 gap-x-3">
				<span className="px-4 py-1">Todo</span>
				<span className="px-4 py-1">In Progress</span>
				<span className="px-4 py-1">Done</span>
			</div>
			<div className="grow h-full overflow-hidden grid grid-cols-3 gap-x-3">
				<DNDTaskManagement />
			</div>
		</div>
	);
};

export default DesktopTaskManagement;
