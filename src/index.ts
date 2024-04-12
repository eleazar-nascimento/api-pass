import { Elysia } from "elysia";

import { z } from "zod";
import swagger from "@elysiajs/swagger";
import { users } from "./db/schema";
import { db } from "./db/connection";

const app = new Elysia().use(swagger())

app.post('/user', async ({ body, set }) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email({
      message: 'E-mail inválido'
    }),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(body)

  await db.insert(users).values({
    name,
    email,
    password
  })

  return set.status = 'Created'
})

app.get('/users', async () => {
  const userss = await db.select().from(users)

  return userss
})

app.listen(4444, () => {
  console.log(`HTTP server running!`)
})
  