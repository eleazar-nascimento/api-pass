import { DrizzleUsersRespository } from "../../repositories/drizzle/drizzle-users-repository"
import { AuthenticateUseCase } from "../authenticate"

export function makeAuthenticateUseCase() {
  const usersRespository = new DrizzleUsersRespository()
  const authenticateUseCase = new AuthenticateUseCase(usersRespository)

  return authenticateUseCase
}