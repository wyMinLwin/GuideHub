import CreateTaskButton from "@/components/desktop/tasks/CreateTaskButton";
import DesktopTaskManagement from "@/components/desktop/tasks/DesktopTaskManagement";
import MobileTaskManagement from "@/components/mobile/MobileTaskManagement";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Tasks | GuideHub",
};

export default function TasksPage() {
	return (
		<div className="w-full h-full bg-light border-2 flex flex-col">
			<div className="flex grow-0 justify-between items-center px-5 py-2">
				<h1 className="text-xl">Tasks</h1>
				<CreateTaskButton />
			</div>
			<div className="grow overflow-hidden">
				<MobileTaskManagement />
				<DesktopTaskManagement />
			</div>
		</div>
	);
}
