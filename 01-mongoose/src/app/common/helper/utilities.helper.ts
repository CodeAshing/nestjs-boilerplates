import { HttpException, Injectable } from '@nestjs/common';
import mongoose, { ClientSession, Model } from 'mongoose';
import * as moment from 'moment-timezone';
moment.tz.setDefault('Asia/Karachi');
const Shortener = require('link-shortener');
import { ConfigService } from '../../../config/config.service';
const configService = new ConfigService();

import { salesUnitCalculationType, sendSMS } from '../type';
import * as fs from 'fs';
import * as pdfParse from 'pdf-parse';
import * as csv from 'fast-csv';

import { RoleEnum } from '../enum';

const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const AWS = require('aws-sdk');
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

  async returnFromCVC(path: string): Promise<any[]> {
    const parsedCSV = await (<Promise<any[]>>new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(path);
      const data = [];

      readStream
        .pipe(csv.parse())
        .on('data', (row) => {
          if (row.length !== 0) {
            const filteredData: [string] = row.filter((str) => {
              if (str.length !== 0) {
                return str;
              }
            });
            data.push(filteredData);
          }
        })
        .on('end', (rowCount) => {
          resolve(data);
        })
        .on('error', (error) => {
          console.error(error);
          reject(error);
        });
    }));

    return parsedCSV;
  }

  async returnFromPDF(path: string) {
    const pdfExtract = await pdfParse(path);
    return pdfExtract.text;
  }

  toTitleCase(str: string): string {
    const result = str.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  async sendEmail(email: string, subject: string, message: string) {
    AWS.config.update({ region: 'us-east-1' });
    const params = {
      Destination: {
        ToAddresses: [email], //Email address/addresses that you want to send your email
      },
      ConfigurationSetName: '01-mongoose',
      Message: {
        Body: {
          Html: {
            //HTML Format of the email
            Charset: 'UTF-8',
            Data: message,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: "user@example.com"
    };
    const ses = new AWS.SES({ apiVersion: '2010-12-01' });
    const sendEmail = ses.sendEmail(params).promise();
    return sendEmail
      .then((data) => {
        return {
          status: 'success',
          data: data,
          message: 'MessageID is ' + data.MessageId,
          code: 200,
        };
      })
      .catch((error) => {
        new HttpException(error, 404);
        console.log(error);
        return {
          status: 'error',
          data: error,
          message: error.stack,
          code: 404,
        };
      });
  }

  async sendSMS(data: sendSMS) {
    AWS.config.update({ region: 'us-east-1' });
    //Create publish parameters
    const params = {
      Message: data.message,
      PhoneNumber: data.phone,
      MessageAttributes: {
        SenderID: {
          DataType: 'String',
          StringValue: '01-mongoose',
        },
      },
    };

    //Create promise and SNS service object
    const publishTextPromise = new AWS.SNS({
      apiVersion: '2010-03-31',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    })
      .publish(params)
      .promise();

    //Handle promise's fulfilled/rejected states
    const response = await publishTextPromise
      .then(function (data: any) {
        return {
          status: 'success',
          data: data,
          message: 'MessageID is: ' + data.MessageId,
          code: 200,
        };
      })
      .catch(function (err: any) {
        return {
          status: 'error',
          data: err,
          message: err.stack,
          code: 404,
        };
      });
    return response;
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

  validateTransactionRequest(ciphertext: string): {
    code: number;
    result: any;
  } {
    try {
      const bytes = CryptoJS.AES.decrypt(
        ciphertext,
        process.env.TRANSACTION_SECRET_KEY,
      ),
        originalText = bytes.toString(CryptoJS.enc.Utf8);
      return { code: 200, result: originalText };
    } catch (e) {
      return { code: 500, result: e.toString() };
    }
  }
}
