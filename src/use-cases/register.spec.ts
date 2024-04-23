import { describe, it, expect } from 'bun:test'
import { RegisterUseCase } from './register';
import { InMemoryUsersRespository } from '../repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '../http/errors/user-already-exists-error';

describe('Register Use Case', () => {
  it('should be able to register registration', async () => {
    const usersRepository = new InMemoryUsersRespository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })
    const hash = await Bun.password.hash(user.password, "bcrypt");
    const isPasswordCorrectlyHashed = await Bun.password.verify(user.password, hash);

    expect(user.id).toEqual(expect.any(String))
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRespository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456'
    })

    expect(() => 
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456'
      })
    ).toThrow('E-mail already exists.')
  })
});