import Elysia, { t } from "elysia";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import { makeRegisterUseCase } from "../../use-cases/factories/make-register-use-case";

export const register = new Elysia().error({
  CONFLICT: UserAlreadyExistsError,
}).onError(({ error, code, set }) => {
  switch (code) {
    case 'CONFLICT':
      set.status = 409
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
  'user', async ({ body, set }) => {
    const { name, email, password } = body
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password
    })

    return set.status = 'Created'
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: 'email' }),
      password: t.String({ minLength: 6, error: 'Password must be contain least 6 character(s).' })
    })
  })
