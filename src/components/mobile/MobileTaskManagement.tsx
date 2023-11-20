import React from "react";
import MobileTasksContainer from "./MobileTasksContainer";

const MobileTaskManagement = () => {
	return (
		<div className="w-full h-full p-2 bg-secondary sm:hidden overflow-y-scroll">
			<MobileTasksContainer />
		</div>
	);
};

export default MobileTaskManagement;
