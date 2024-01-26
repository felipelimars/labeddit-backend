import z from 'zod'

export interface SignupInputDTO {
  username: string,
  email: string,
  password: string
}

export interface SignupOutputDTO {
  token: string
}

export const SignupSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4)
}).transform(data => data as SignupInputDTO)