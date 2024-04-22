import { InvalidCredentialsError } from "../http/errors/invalid-credentials-error";
import type { ICreateUsersResponse, UsersRespository } from "../repositories/users-repository";

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: ICreateUsersResponse
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRespository
  ) {}

  async execute({ email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    // buscar o usuário no banco pelo e-mail
    // comparar se a senha salva no banco bate com a senha do parametro

    const user = await this.usersRepository.findByEmail(email)

    if(!user) throw new InvalidCredentialsError()

    const doesPasswordMatches = await Bun.password.verify(password, user.password)

    if(!doesPasswordMatches) throw new InvalidCredentialsError()

    return {
      user
    }
  }
}