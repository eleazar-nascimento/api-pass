import Elysia, { NotFoundError, t } from "elysia";
import { db } from "../../db/connection";
import { authLinks, users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { env } from "../../env";

export const sendAuthLink = new Elysia().error({
  NOT_FOUND: NotFoundError,
}).onError(({ error, code, set }) => {
  switch (code) {
    case 'NOT_FOUND':
      set.status = 400
      return {
        code, 
        message: error.message
      }
  
    default:
      return {
        code,
        message: error.message
      }
  }
}).post('/authenticate', async ({ body }) => {
  const { email } = body

  const userFromEmail = await db.query.users.findFirst({
    where(fields, { eq }) {
      return eq(fields.email, email)
    }
  })

  if(!userFromEmail) {
    throw new NotFoundError()
  }

  const authLinkCode = createId()

  await db.insert(authLinks).values({
    usersId: userFromEmail.id,
    code: authLinkCode
  })

  const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL)

  authLink.searchParams.set('code', authLinkCode)
  authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL)
  
  console.log(authLink.toString())
}, {
  body: t.Object({
    email: t.String({ format: 'email' })
  })
})