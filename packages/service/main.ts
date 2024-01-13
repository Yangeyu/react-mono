import { Hono } from 'hono'
import { cors } from 'hono/middleware'
import demoApp from "@mods/demo/index.ts"

const app = new Hono()
app.use('/*', cors())

app.route('/demo', demoApp)

Deno.serve({ port: 3333 }, app.fetch)

