import { apiFetch } from "./BaseApi";

// Тип задачи — можно расширять
export type Task = {
    id: number;
    title: string;
    description: string;
    state: string;
};

export const TasksService = {
    async getTasks(): Promise<Task[]> {
        return apiFetch<Task[]>("/api/v1/task", {
            method: "GET",
        });
    },

    async createTask(title: string, description: string): Promise<Task> {
        return apiFetch<Task>("/api/v1/task", {
            method: "POST",
            body: JSON.stringify({
                title,
                description,
            }),
        });
    },

    async updateTaskState(taskId: number): Promise<Task> {
        return apiFetch<Task>(`/api/v1/task/${taskId}/change_state`, {
            method: "PATCH",
        })

    }
}
