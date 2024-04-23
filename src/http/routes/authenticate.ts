import Elysia, { t } from "elysia";
import { DrizzleUsersRespository } from "../../repositories/drizzle/drizzle-users-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { AuthenticateUseCase } from "../../use-cases/authenticate";

export const authenticate = new Elysia().error({
  CONFLICT: InvalidCredentialsError,
}).onError(({ error, code, set }) => {
  switch (code) {
    case 'CONFLICT':
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
}).post(
  'sessions', async ({ body, set }) => {
    const { email, password } = body

    const usersRespository = new DrizzleUsersRespository()
  
    const authenticateUseCase = new AuthenticateUseCase(usersRespository)

    await authenticateUseCase.execute({
      email,
      password
    })

    return set.status = 'OK'
  }, {
    body: t.Object({
      email: t.String({ format: 'email' }),
      password: t.String({ minLength: 6, error: 'Password must be contain least 6 character(s).' })
    })
  })
