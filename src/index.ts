import { Elysia, t } from "elysia";
import { register } from "./http/routes/register";
import { db } from "./db/connection";
import swagger from "@elysiajs/swagger";

const app = new Elysia().use(register).use(swagger()).onError(({ error, code, set }) => {
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
  