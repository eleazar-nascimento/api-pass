import { describe, it, expect, beforeEach } from 'bun:test'
import { AuthenticateUseCase } from './authenticate';
import { InMemoryUsersRespository } from '../repositories/in-memory/in-memory-users-repository';

let usersRepository: InMemoryUsersRespository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRespository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const password_hash = await Bun.password.hash('123456', {
      algorithm: 'bcrypt',
      cost: 4
    })

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: password_hash
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    expect(() => sut.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })).toThrow('Invalid credentials.')
  })

  it('should not be able to authenticate with wrong password', async () => {
    const password_hash = await Bun.password.hash('123456', {
      algorithm: 'bcrypt',
      cost: 4
    })

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: password_hash
    })

    expect(() => sut.execute({
      email: 'johndoe@example.com',
      password: '1234'
    })).toThrow('Invalid credentials.')
  })
});