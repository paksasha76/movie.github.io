import { z } from "zod";

export interface inputValues {
  title: string;
  body: string;
  image: string;
}

const enumRoleUser = z.enum(["Базовый", "Продвинутый", "Админ"]);

export const schemaTodoItem = z.object({
  id: z.string(),
  title: z.string().min(4),
  body: z.string(),
  userId: z.number().optional(),
  image: z.string(),
});

export const schemaUserItem = z.object({
  username: z.string().min(4),
  id: z.string(),
  password: z.string().min(8),
  role: enumRoleUser,
});

export type TodoItem = z.infer<typeof schemaTodoItem>;

export type RoleUser = z.infer<typeof enumRoleUser>;

export type UserItem = z.infer<typeof schemaUserItem>;
