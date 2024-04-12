import { Elysia, t } from "elysia";
import { register } from "./http/routes/register";
import { db } from "./db/connection";
import swagger from "@elysiajs/swagger";

const app = new Elysia().use(register).use(swagger())

app.get('/users', async () => {
  const [users] = await db.query.users.findMany()

  return users
})

app.listen(4444, () => {
  console.log(`HTTP server running!`)
})
  