import { RoleEnum } from 'src/app/common/enum'

export interface IUserToken {
  user: RoleEnum
  email: string
  type: string
}
