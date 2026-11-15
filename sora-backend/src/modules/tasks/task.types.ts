export type TaskStatus = "pending" | "in_progress" | "completed";

export interface Task {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  due_at: Date | null;
  created_at: Date;
}

export interface CreateTaskDTO {
  user_id: number;
  title: string;
  description?: string;
  status?: TaskStatus;
  due_at?: string | null;
}

export type UpdateTaskDTO = Partial<Omit<CreateTaskDTO, "user_id">>;
