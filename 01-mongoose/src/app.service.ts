import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor() {}
  async getHello(): Promise<any> {
    return 'Hello World'
  }
}
