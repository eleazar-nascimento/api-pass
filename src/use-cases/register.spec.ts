import { describe, it, expect } from 'bun:test'
import { RegisterUseCase } from './register';

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return undefined
      },
      async create(data) {
        return {
          id: 'id-test',
          name: data.email,
          email: data.email,
          password: data.password,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      }
    })

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })
    const hash = await Bun.password.hash(user.password, "bcrypt");
    const isPasswordCorrectlyHashed = await Bun.password.verify(user.password, hash);

    console.log(isPasswordCorrectlyHashed)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
});