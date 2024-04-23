import { describe, it, expect } from 'bun:test'
import { AuthenticateUseCase } from './authenticate';
import { InMemoryUsersRespository } from '../repositories/in-memory/in-memory-users-repository';

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRespository()
    const sut = new AuthenticateUseCase(usersRepository)
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
    const usersRepository = new InMemoryUsersRespository()
    const sut = new AuthenticateUseCase(usersRepository)

    expect(() => sut.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })).toThrow('Invalid credentials.')
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRespository()
    const sut = new AuthenticateUseCase(usersRepository)
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