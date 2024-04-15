import type { RowList } from "postgres"

export interface ICreateUsers {
  name: string
  email: string
  password: string | null
}

export interface UsersRespository {
  findByEmail(email: string): Promise<ICreateUsers | undefined>
  create(data: ICreateUsers): Promise<ICreateUsers | RowList<never[]>>
}