import type { RowList } from "postgres"

export interface ICreateUsersRequest {
  name: string
  email: string
  password: string
}


export interface ICreateUsersResponse {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export interface UsersRespository {
  findByEmail(email: string): Promise<ICreateUsersResponse | undefined>
  create(data: ICreateUsersRequest): Promise<ICreateUsersResponse>
}