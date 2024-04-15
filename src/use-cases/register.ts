import { db } from "../db/connection"
import { ConflictError } from "../http/errors/conflict-error"
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
      throw new ConflictError()
    }

    await this.usersRepository.create({
      name,
      email,
      password: password_hash
    })
  }
}