import { Elysia, t } from "elysia";
import { register } from "./http/routes/register";
import { db } from "./db/connection";
import swagger from "@elysiajs/swagger";
import { authenticate } from "./http/routes/authenticate";
import { sendAuthLink } from "./http/routes/send-auth-link";
import jwt from "@elysiajs/jwt";
import { env } from "./env";
import cookie from "@elysiajs/cookie";

const app = new Elysia()
  .use(jwt({
    secret: env.JWT_SECRET_KEY,
    schema: t.Object({
      sub: t.String(),
      gymId: t.Optional(t.String()),
    })
  }))
  .use(cookie())
  .use(register)
  .use(authenticate)
  .use(sendAuthLink)
  .use(swagger())
  .onError(({ error, code, set }) => {
  switch (code) {
    case 'NOT_FOUND': {
      set.status = 404
      return { code, message: 'Page not found.', error }
    }
  
    default: {
      return { code, message: error.message, error }
    }
  }
})

app.get('/users', async () => {
  const users = await db.query.users.findMany()

  return users
})

app.listen(4444, () => {
  console.log(`HTTP server running!`)
})
  