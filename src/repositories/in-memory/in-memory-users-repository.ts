import type { ICreateUsersRequest, ICreateUsersResponse, UsersRespository } from "../users-repository";

export class InMemoryUsersRespository implements UsersRespository {
  public items: ICreateUsersResponse[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if(!user) {
      return undefined
    }
  
    return user
  }
  async create(data: ICreateUsersRequest) {
    const user = {
      id: 'id-test',
      name: data.email,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(user)

    return user

  }

}
