import { z } from "zod";

export const z_user = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
});
export const z_userList = z.array(z_user);
export type UserList = z.infer<typeof z_userList>;

