import { TaskStatus } from "./TaskStatus"

export type TaskType = {
    id: string,
    title: string,
    body: string,
    status: TaskStatus
}