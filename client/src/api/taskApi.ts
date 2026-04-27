import api from "./axios";

export const addTask = async (task: any) => {
    const res = await api.post("/task/create", task);
    return res.data;
};

export const updateTask = async (task: any, id: string) => {
    const res = await api.patch(`/task/${id}`, task);
    return res.data;
};

export const getSingleTask = async (id: string) => {
    const res = await api.get(`/task/${id}`)
    return res.data;
}

export interface Task {
    _id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    assignedTo?: {
        _id: string;
        name: string;
        email: string;
    };
    createdBy: {
        _id: string;
        name: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface TaskResponse {
    tasks: Task[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number; // 👈 You had this in your backend, let's add it here!
    };
}

// Update the function to accept optional parameters
export const getTasks = async (params?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
    assignedTo?: string;
}): Promise<TaskResponse> => {
    // Axios will automatically convert the params object into ?status=xxx&page=1
    const res = await api.get<TaskResponse>("/task", { params });
    return res.data;
};

export const removeTask = async (id: string) => {
    const res = await api.delete(`/task/${id}`);
    return res.data;
}


export const getTaskByEmp = async () => {
    const res = await api.get('/task/my-tasks')
    return res.data;
}
export const updateTaskStatusByEmp = async (id: string, status: string) => {
    console.log(status, id);
    const res = await api.patch(`/task/${id}`, { status: status });
    console.log("res", res);
    return res.data;
};