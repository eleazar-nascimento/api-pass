import { db } from "../db/connection"
import { UserAlreadyExistsError } from "../http/errors/user-already-exists-error"
import type { UsersRespository } from "../repositories/users-repository"

interface RegisterRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRespository) {
    
  }
  async execute({ email, name, password }: RegisterRequest) {
    const password_hash = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 4
    })
  
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
  
    if(userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      password: password_hash
    })
  }
}