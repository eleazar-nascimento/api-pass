import Elysia, { t } from "elysia";
import { db } from "../../db/connection";
import { users } from "../../db/schema";

export const register = new Elysia().post(
  'user', async ({ body, set }) => {
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
