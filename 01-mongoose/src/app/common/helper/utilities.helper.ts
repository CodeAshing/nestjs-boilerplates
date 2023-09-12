import { Injectable } from '@nestjs/common'
import * as moment from 'moment-timezone'
moment.tz.setDefault('Asia/Karachi')

import * as bcrypt from 'bcrypt'
const jwt = require('jsonwebtoken')
@Injectable()
export class Helper {
  async comparePassword(plainPass, hashWord) {
    return await bcrypt.compare(plainPass, hashWord)
  }

  async encryptPassword(plainPass) {
    const saltOrRounds = 10
    const salt = await bcrypt.genSalt(saltOrRounds)
    return await bcrypt.hash(plainPass, salt)
  }
}
