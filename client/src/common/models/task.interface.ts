export interface Task {
    id: number
    title: string,
    description: string,
    priority: number
    dueDate?: string,
    taskGroupName?: string
}

export interface TaskGroup {
    id: number
    name: string,
    description?: string,
    numberOfTasks?: number
}
