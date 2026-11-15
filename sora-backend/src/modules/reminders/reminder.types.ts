export interface Reminder {
  id: number;
  user_id: number;
  title: string;
  message: string | null;
  remind_at: Date;
  completed: boolean;
  created_at: Date;
}
export interface CreateReminderDTO {
  user_id: number;
  title: string;
  message?: string;
  remind_at: string;
  completed?: boolean;
}
export type UpdateReminderDTO = Partial<Omit<CreateReminderDTO, "user_id">>;
