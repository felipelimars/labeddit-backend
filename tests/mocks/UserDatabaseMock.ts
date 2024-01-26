import { UserDB } from "../../src/models/User";
import { BaseDatabase } from "../../src/database/BaseDatabase";

const usersMock: UserDB[] = [
  {
    id: "id-mock-fulano",
    username: "Fulano",
    email: "fulano@email.com",
    password: "hash-mock-fulano", // senha = "fulano123"
  },
  {
    id: "id-mock-astrodev",
    username: "Astrodev",
    email: "astrodev@email.com",
    password: "hash-mock-astrodev", // senha = "astrodev99"
  },
]

export class UserDatabaseMock extends BaseDatabase {
  public static TABLE_USERS = "users"

  public async findUsers(
    q: string | undefined
  ): Promise<UserDB[]> {
    if (q) {
      return usersMock.filter(user =>
          user.username.toLocaleLowerCase()
            .includes(q.toLocaleLowerCase()))

    } else {
      return usersMock
    }
  }
}