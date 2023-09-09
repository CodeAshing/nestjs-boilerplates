import { Injectable } from '@nestjs/common';
import mongoose, { ClientSession, Model } from 'mongoose';
import * as moment from 'moment-timezone';
moment.tz.setDefault('Asia/Karachi');

import { salesUnitCalculationType, sendSMS } from '../type';

import { RoleEnum } from '../enum';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
@Injectable()
export class Helper {
  onlyUnique(value, index, self) {
    return (
      self.findIndex(
        (item) =>
          Object.values(item).toString() === Object.values(value).toString(),
      ) === index
    );
  }

  transformObjectToKey(values, key) {
    const returnedObject = {};
    values.map((item) => {
      returnedObject[item[key].toString()] = item;
    });
    return returnedObject;
  }

  getFields(input, field) {
    console.log('..2');
    const output = [];
    for (let i = 0; i < input.length; ++i)
      if (!output.includes(input[i][field].toString()))
        output.push(input[i][field].toString());
    console.log('..2');
    return output;
  }

  calculatePercentage(amount: number, percent: number): number {
    return (percent / 100) * amount;
  }

  removeDuplicates(arr) {
    return arr.filter(
      (value, index, self) =>
        index ===
        self.findIndex((t) => String(t.block) === String(value.block)),
    );
  }

  generateUniqueCode(): number {
    const OTP = Math.floor(1000 + Math.random() * 9000);
    return OTP;
  }

  generateJWTForWeb(cnic: number, otp: number, expiresIn: string): any {
    return jwt.sign({ cnic: cnic, otp: otp }, process.env.JWT_SECRET, {
      expiresIn: expiresIn,
    });
  }

  generateJWTForMob(
    empCode: string,
    deviceToken: string,
    otp: number,
    expiresIn: string,
  ): any {
    return jwt.sign(
      {
        user: RoleEnum.EMPLOYEE,
        employeeCode: empCode,
        deviceToken: deviceToken,
        otp: otp,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: expiresIn,
      },
    );
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
        console.log({ error });
      });

    if (!receivedOTP) return { success: false, msg: 'Invalid OTP' };
    return { success: true, msg: 'success' };
  }

  async expireOTP(uId: mongoose.Types.ObjectId, otpModel: any): Promise<void> {
    await otpModel
      .updateOne(
        { uId: uId },
        {
          otp: this.generateUniqueCode(),
        },
      )
      .catch((error: any) => {
        console.log({ error });
      });
  }

  toTitleCase(str: string): string {
    const result = str.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }


  async insertLog(
    log: any,
    logsModel: any,
    session: ClientSession,
  ): Promise<{ success: boolean; msg?: string }> {
    try {
      await logsModel
        .create([log], { session: session })
        .catch((error: any) => {
          throw new Error(error);
        });
      return { success: true };
    } catch (e) {
      return { success: false, msg: e };
    }
  }

  salesUnitCalculation(sale: salesUnitCalculationType) { }

  async comparePassword(plainPass, hashword) {
    return await bcrypt.compare(plainPass, hashword);
  }

}
