import { UserAlreadyExistsError } from "../http/errors/user-already-exists-error"
import type { ICreateUsersRequest, ICreateUsersResponse, UsersRespository } from "../repositories/users-repository"

interface RegisterResponse {
  user: ICreateUsersResponse
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRespository) {}
  async execute({ email, name, password }: ICreateUsersRequest): Promise<RegisterResponse> {
    const password_hash = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 4
    })
  
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
  
    if(userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash
    })

    return {
      user
    }
  }
}