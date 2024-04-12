import { Elysia, t } from "elysia";

import { z } from "zod";
import swagger from "@elysiajs/swagger";
import { users } from "./db/schema";
import { db } from "./db/connection";

const app = new Elysia().use(swagger())

app.post('/user', async ({ body, set }) => {
  const { name, email, password } = body

  await db.insert(users).values({
    name,
    email,
    password
  })

  return set.status = 'Created'
}, {
  body: t.Object({
    name: t.String(),
    email: t.String({ format: 'email' }),
    password: t.String()
  })
})

app.get('/users', async () => {
  const userss = await db.select().from(users)

  return userss
})

app.listen(4444, () => {
  console.log(`HTTP server running!`)
})
  