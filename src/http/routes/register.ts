import Elysia, { t } from "elysia";
import { RegisterUseCase } from "../../use-cases/register";
import { ConflictError } from "../errors/conflict-error";
import { DrizzleUsersRespository } from "../../repositories/drizzle/drizzle-users-repository";

export const register = new Elysia().error({
  CONFLICT: ConflictError,
}).onError(({ error, code, set }) => {
  switch (code) {
    case 'CONFLICT':
      set.status = 409
      return {
        code,
        message: error.message
      }
    default:
      break;
  }
}).post(
  'user', async ({ body, set }) => {
    const { name, email, password } = body

    const usersRespository = new DrizzleUsersRespository()
  
    const registerUseCase = new RegisterUseCase(usersRespository)

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
      password: t.String()
    })
  })
