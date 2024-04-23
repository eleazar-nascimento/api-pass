import { DrizzleUsersRespository } from "../../repositories/drizzle/drizzle-users-repository"
import { RegisterUseCase } from "../register"

export function makeRegisterUseCase() {
  const usersRespository = new DrizzleUsersRespository()
  const registerUseCase = new RegisterUseCase(usersRespository)

  return registerUseCase
}