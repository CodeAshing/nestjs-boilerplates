import { RoleEnum } from 'src/app/common/enum'

export interface JWTPayload {
  user: RoleEnum
  email: string
  type: string
  iat: number
  exp: number
  iss: string
}
