export interface UserDB {
  id: string,
  username: string,
  email: string,
  password: string
}

export interface UserModel {
  id: string,
  username: string,
  email: string,
  password: string
}

export interface TokenPayload {
  id: string
}

export default class User {
  constructor(
    private id: string,
    private username: string,
    private email: string,
    private password: string
  ) {}

  public getId(): string {
    return this.id
  }

  public setId(value: string): void {
    this.id = value
  }

  public getUsername(): string {
    return this.username
  }

  public setUsername(value: string): void {
    this.username = value
  }

  public getEmail(): string {
    return this.email
  }

  public setEmail(value: string): void {
    this.email = value
  }

  public getPassword(): string {
    return this.password
  }

  public setPassword(value: string): void {
    this.password = value
  }

  public toUserDB(): UserDB {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password
    }
  }

  public toUserModel(): UserModel {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password
    }
  }
}