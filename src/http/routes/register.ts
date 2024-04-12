import Elysia, { t } from "elysia";
import { db } from "../../db/connection";
import { users } from "../../db/schema";

export const register = new Elysia().post(
  'user', async ({ body, set }) => {
    const { name, email, password } = body

    const password_hash = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 4
    })

    const userWithSameEmail = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, email)
      }
    })

    if(userWithSameEmail) {
      return set.status = 'Conflict'
    }
  
    await db.insert(users).values({
      name,
      email,
      password: password_hash
    })
  
    return set.status = 'Created'
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: 'email' }),
      password: t.String()
    })
  })
