import { Context, Hono, Next } from "hono";
import { ulid } from "ulid";
import { UserList, z_user, PersonList, z_personList, z_person } from "@mods/demo/types.ts";
import { formatErrorResBody, formatSuccessResBody } from "@mods/demo/utils.ts";
import * as xlsx from "sheetjs";

const genSheetData = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    const name = `Person ${i + 1}`;
    const age = Math.floor(Math.random() * 50) + 20; // 随机生成年龄（20-69岁）
    data.push([name, age]);
  }
  return data;
};
const genXLSXFile = () => {
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.aoa_to_sheet([
    ["Name", "Age"],
    ...genSheetData(),
  ]);
  xlsx.utils.book_append_sheet(workbook, worksheet, "sheet1");
  xlsx.writeFile(workbook, "outfile.xlsx");
};

const USER = "user";
const SHEET = "sheet"
const demoApp = new Hono();
const rootPath = Deno.cwd();

const kv = await Deno.openKv(`${rootPath}/kv/demo`);
const sheetKv  = await Deno.openKv(`${rootPath}/kv/sheet`)

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
  const body = await c.req.json();
  const res = z_user.pick({ id: true }).safeParse(body);
  if (!res.success) {
    return c.json(formatErrorResBody(10001, res.error.flatten()));
  }

  kv.delete([USER, res.data.id]);
  return c.json(formatSuccessResBody(null));
});

demoApp.post("/upload", async (c: Context) => {
  const body = await c.req.parseBody({ all: true });

  const file = body["file"] as File;
  const workbook = xlsx.readFileSync("./uploads/outfile.xlsx")
  const name = workbook.SheetNames?.[0]
  
  const worksheet = workbook.Sheets[name]
  const jsonData = xlsx.utils.sheet_to_json(worksheet)
  jsonData.forEach(item => {
    const id = ulid()
    sheetKv.set([SHEET, id], {id, ...item})
  })


  await Deno.writeFile(`./uploads/${file.name}`, file.stream());

  return c.json({
    message: "success",
    data: {name, jsonData},
    code: 0,
  });
});

demoApp.post("/get-sheet-list", async (c: Context) => {
  const sheetList: PersonList = [];
  const sheetmap = new Map<number, number>()
  const sheetit = sheetKv.list({ prefix: [SHEET] });
  for await (const s of sheetit) {
    const res = z_person.safeParse(s.value)
    if (!res.success) return formatErrorResBody(10002, res.error.flatten())
    sheetList.push(res.data);
  }

  sheetList.forEach(item => {
    sheetmap.has(item.Age)
      ? sheetmap.set(item.Age, sheetmap.get(item.Age)! + 1)
      : sheetmap.set(item.Age, 1)
  })
  
  

  return c.json(formatSuccessResBody({
    total: sheetList.length,
    list: sheetList,
    count: Array.from(sheetmap)
    .toSorted((a, b) => a[0] - b[0])
    .map(item => ({name: item[0], value: item[1]}))
  }));
});

export default demoApp;
