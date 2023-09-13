import { Injectable } from '@nestjs/common';
import { ExistingUserDto } from 'src/user/dto/existing-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { EmployerService } from 'src/employer/employer.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private employerService: EmployerService,
    private jwtService: JwtService,
  ) {}

  async registerUser(user: ExistingUserDto) {
    const findUser = await this.userService.findOneByEmail(user.email);
    if (findUser) {
      throw new Error('User already exists');
    }
    const newUser = await this.userService.create(user);
    return { name: newUser.name, email: newUser.email };
  }

  async registerEmployer(user: ExistingUserDto) {
    const findUser = await this.employerService.findOneByEmail(user.email);
    if (findUser) {
      throw new Error('User already exists');
    }
    const newUser = await this.employerService.create(user);
    return { name: newUser.name, email: newUser.email };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );

    const payload = { email: user.email, name: user.name };
    const jwt = await this.jwtService.signAsync(payload);
    return { jwt };
  }

  async loginEmployer(loginUserDto: LoginUserDto) {
    const user = await this.validateEmployer(
      loginUserDto.email,
      loginUserDto.password,
    );

    const payload = { email: user.email, name: user.name };
    const jwt = await this.jwtService.signAsync(payload);
    return { jwt };
  }

  async doesPasswordMatch(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword); // true
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordMatching = await this.doesPasswordMatch(
      password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new Error('Invalid credentials');
    }
    return { name: user.name, email: user.email };
  }

  async validateEmployer(email: string, password: string) {
    const user = await this.employerService.findOneByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordMatching = await this.doesPasswordMatch(
      password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new Error('Invalid credentials');
    }
    return { name: user.name, email: user.email };
  }

  async verifyJwt(jwt: string) {
    const payloadReturn = await this.jwtService.verifyAsync(jwt);

    //Check if token is expired
    // if (payloadReturn.exp < Date.now()) {
    //   throw new Error('Token expired');
    // }

    return payloadReturn;
  }
}
