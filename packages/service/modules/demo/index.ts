import { Context, Hono, Next } from "hono";
import { ulid } from "ulid";
import { UserList, z_user } from "@mods/demo/types.ts";
import { formatErrorResBody, formatSuccessResBody } from "@mods/demo/utils.ts";

const USER = "user";
const demoApp = new Hono();
const rootPath = Deno.cwd()

const kv = await Deno.openKv(`${rootPath}/kv/demo`);

demoApp.get("/hello", async (c: Context, next: Next) => {
  await next();
  return c.json({ a: "bb" });
});

demoApp.post("/add-user", async (c: Context) => {
  const body = await c.req.json();
  const res = z_user.safeParse({ ...body, id: ulid() });
  if (!res.success) {
    return c.json(formatErrorResBody(10001, res.error.flatten()));
  }

  kv.set([USER, res.data.id], res.data);

  return c.json(formatSuccessResBody(null));
});

demoApp.post("/get-user", async (c: Context) => {
  const body = await c.req.json();

  const res = z_user.pick({ id: true }).safeParse(body);
  if (!res.success) {
    return c.json(formatErrorResBody(10001, res.error.flatten()));
  }

  const { id } = res.data;
  const user = await kv.get([USER, id]);
  return c.json(formatSuccessResBody(user.value));
});

// 获取用户列表
demoApp.post("/get-user-list", async (c: Context) => {
  const userList: UserList = [];
  const userit = kv.list({ prefix: [USER] });
  for await (const user of userit) {
    const res = z_user.safeParse(user.value);
    if (!res.success) {
      return c.json(formatErrorResBody(10001, res.error.flatten()));
    }
    userList.push(res.data);
  }

  return c.json(formatSuccessResBody(userList));
});

demoApp.post("delete-user", async (c: Context) => {
  const body = await c.req.json()
  const res = z_user.pick({ id: true }).safeParse(body);
  if (!res.success) {
    return c.json(formatErrorResBody(10001, res.error.flatten()));
  }

  kv.delete([USER, res.data.id])
  return c.json(formatSuccessResBody(null));
});

demoApp.post("/upload", async (c: Context) => {
  const body = await c.req.parseBody({ all: true });

  const file = body["file"] as File;
  await Deno.writeFile(`./uploads/${file.name}`, file.stream());

  return c.json({
    message: "success",
    code: 0,
  });
});

export default demoApp;

