import { TaskStatus } from "./TaskStatus";

export type TaskType = {
	_id: string;
	title: string;
	body: string;
	status: TaskStatus;
	user: string;
};
