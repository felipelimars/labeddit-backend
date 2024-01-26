import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export default class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users"

  public createUser = async (userDB: UserDB): Promise<void> => {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .insert(userDB)
  }

  public findUserByEmail = async (email: string): Promise<UserDB | undefined> => {
    const [result]: UserDB[] | undefined[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .where({ email })

    return result
  }
}