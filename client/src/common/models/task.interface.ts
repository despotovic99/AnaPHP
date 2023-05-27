export interface Task {
    id: number
    title: string,
    description: string,
    priority: number
    dueDate?: string,
    taskGroupName?: string
    files?: any
    managerId?: number
    taskGroupId?: number
    executors?: { firstName: string, userId: number }[],
    status?: boolean
}

export interface TaskGroup {
    id: number
    name: string,
    description?: string,
    numberOfTasks?: number
}

export interface Comment {
    id: number;
    content: string;
    userId: number,
    taskId: number
}
