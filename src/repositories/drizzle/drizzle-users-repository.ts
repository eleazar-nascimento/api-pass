import type { RowList } from "postgres";
import { db } from "../../db/connection";
import { users } from "../../db/schema";
import type { ICreateUsers, UsersRespository } from "../users-repository";

export class DrizzleUsersRespository implements UsersRespository{
  async findByEmail(email: string): Promise<ICreateUsers | undefined> {
    const user = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, email)
      }
    })

    return user
  }
  
  async create(data: ICreateUsers): Promise<ICreateUsers | RowList<never[]>> {
    const user = await db.insert(users).values(data)

    return user
  }
}