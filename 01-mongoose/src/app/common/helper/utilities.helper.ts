import { Injectable } from '@nestjs/common'
import mongoose, { ClientSession, Model } from 'mongoose'
import * as moment from 'moment-timezone'
moment.tz.setDefault('Asia/Karachi')

import { salesUnitCalculationType, sendSMS } from '../type'

import { RoleEnum } from '../enum'

import * as bcrypt from 'bcrypt'
const jwt = require('jsonwebtoken')
@Injectable()
export class Helper {
  generateJWTForWeb(cnic: number, otp: number, expiresIn: string): any {
    return jwt.sign({ cnic: cnic, otp: otp }, process.env.JWT_SECRET, {
      expiresIn: expiresIn,
    })
  }

  async validateOTP(
    otp: number,
    uId: mongoose.Types.ObjectId,
    otpModel: any,
  ): Promise<{ success: boolean; msg: string }> {
    const receivedOTP = await otpModel
      .findOne({
        uId: uId,
        otp: otp,
        validity: { $gte: moment().toDate() },
      })
      .catch((error: any) => {
        console.log({ error })
      })

    if (!receivedOTP) return { success: false, msg: 'Invalid OTP' }
    return { success: true, msg: 'success' }
  }

  async comparePassword(plainPass, hashWord) {
    return await bcrypt.compare(plainPass, hashWord)
  }

  async encryptPassword(plainPass) {
    const saltOrRounds = 10
    const salt = await bcrypt.genSalt(saltOrRounds)
    return await bcrypt.hash(plainPass, salt)
  }
}
