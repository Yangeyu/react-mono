import { Hono } from 'hono'
import demoApp from "@mods/demo/index.ts"

const app = new Hono()

app.route('/demo', demoApp)

Deno.serve({ port: 3333 }, app.fetch)

