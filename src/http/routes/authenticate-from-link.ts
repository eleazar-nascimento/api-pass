import Elysia, { t } from "elysia";
import { db } from "../../db/connection";
import dayjs from "dayjs";
import { auth } from "./auth";
import { authLinks } from "../../db/schema";
import { eq } from "drizzle-orm";

export const authenticateFromLink = new Elysia().use(auth).get('/auth-links/authenticate', async ({ query, jwt: { sign }, cookie: { auth }, set }) => {
  const { code, redirect, } = query

  const authLinkFromCode = await db.query.authLinks.findFirst({
    where(fields, { eq }) {
        return eq(fields.code, code)
    },
  })

  if(!authLinkFromCode) {
    throw new Error('Auth link not found.')
  }

  const daysSinceAuthLinkWasCreated = dayjs().diff(authLinkFromCode.createdAt, 'days')

  if(daysSinceAuthLinkWasCreated > 7) {
    throw new Error('Auth link expired, please generate a new one')
  }

  const jwt = await sign({
    sub: authLinkFromCode.usersId
  })
  
  auth.value = jwt
  auth.httpOnly = true
  auth.maxAge = 60 * 60 * 24 * 7 // 7 days
  auth.path = '/'

  await db.delete(authLinks).where(eq(authLinks.code, code))

  set.redirect = redirect
}, {
  query: t.Object({
    code: t.String(),
    redirect: t.String()
  })
})