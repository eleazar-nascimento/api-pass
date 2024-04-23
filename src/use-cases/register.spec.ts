import { describe, it, expect, beforeEach } from 'bun:test'
import { RegisterUseCase } from './register';
import { InMemoryUsersRespository } from '../repositories/in-memory/in-memory-users-repository';

let usersRepository: InMemoryUsersRespository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository= new InMemoryUsersRespository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register registration', async () => {

    const { user } = await sut.execute({
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
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456'
    })

    expect(() => 
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456'
      })
    ).toThrow('E-mail already exists.')
  })
});