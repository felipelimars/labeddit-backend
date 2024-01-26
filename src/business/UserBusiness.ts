import UserDatabase from "../database/UserDatabase";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/users/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/users/signup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import User, { TokenPayload, UserDB } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export default class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private tokenManager: TokenManager
  ) {}

  public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
    const userDB: UserDB | undefined = await this.userDatabase.findUserByEmail(input.email)
    
    if (userDB) {
      throw new BadRequestError("E-mail já cadastrado.")
    }

    const newId = this.idGenerator.generate()

    const hashedPassword = await this.hashManager.hash(input.password)
    
    const newUser = new User(
      newId,
      input.username,
      input.email,
      hashedPassword
    )

    await this.userDatabase.createUser(newUser.toUserDB())

    const payload: TokenPayload = {
      id: newId
    }

    const token = this.tokenManager.createToken(payload)

    const output: SignupOutputDTO = {
      token
    }

    return output
  }

  public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
    const userDB: UserDB | undefined = await this.userDatabase.findUserByEmail(input.email)
    
    if (!userDB) {
      throw new BadRequestError("E-mail não cadastrado.")
    }
    
    const user = new User(
      userDB.id,
      userDB.username,
      userDB.email,
      userDB.password
      )
      
    const plaintext = input.password
    const hash = user.getPassword()
    const isPasswordCorrect = await this.hashManager.compare(plaintext, hash)

    if (!isPasswordCorrect) {
      throw new BadRequestError("Senha incorreta.")
    }

    const payload: TokenPayload = {
      id: user.getId()
    }

    const token = this.tokenManager.createToken(payload)

    const output: LoginOutputDTO = {
      token
    }

    return output
  }
}