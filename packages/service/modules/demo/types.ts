import { z } from "zod";

export const z_user = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
});
export const z_userList = z.array(z_user);
export type UserList = z.infer<typeof z_userList>;

export const z_person = z.object({
  id: z.string(),
  Name: z.string(),
  Age: z.number()
})

export const z_personList = z.array(z_person)
export type PersonList = z.infer<typeof z_personList>

