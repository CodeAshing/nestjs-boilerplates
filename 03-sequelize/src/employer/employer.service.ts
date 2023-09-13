import { Injectable } from '@nestjs/common';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employer } from './entities/employer.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Employer)
    private readonly employerRepo: Repository<Employer>,
  ) {}

  async create(createUserDto: CreateEmployerDto): Promise<Employer> {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(createUserDto.password, saltRounds);
    const newUser = await this.employerRepo.create({
      ...createUserDto,
      password: hash,
    });

    await this.employerRepo.save(newUser);

    return newUser;
  }

  async findAll() {
    const users = await this.employerRepo.find();
    if (!users) {
      throw new Error('No users found');
    }
    return users;
  }

  async findOneByEmail(email: string) {
    const user = await this.employerRepo.findOneBy({ email });
    return user;
  }

  findOne(id: number) {
    const user = this.employerRepo.findOneBy({ id });
    return user;
  }

  update(id: number, updateUserDto: UpdateEmployerDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
