import { TokenPayload } from '../../src/models/User'

export class TokenManagerMock {
  public createToken = (payload: TokenPayload): string => {
    if (payload.id === "id-mock") {
      return "token-mock"

    } else if (payload.id === "id-mock-user") {
      return "token-mock-user"

    } else {
      return "token-mock-admin"
    }
  }

  public getPayload = (token: string): TokenPayload | null => {
    if (token === "token-mock-user") {
      return {
        id: "id-mock-user"
      }

    } else if (token === "token-mock-admin") {
      return {
        id: "id-mock-admin"
      }

    } else {
      return null
    }
  }
}