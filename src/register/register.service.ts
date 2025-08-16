import { Injectable } from '@nestjs/common';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/register.entity';
import { Repository } from 'typeorm';
import { CreateRegisterDto } from './dto/create-register.dto';
import { error } from 'console';
import bcrypt from 'bcrypt'

@Injectable()
export class RegisterService {
    constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
   ) {}

  async create(createRegisterdto : CreateRegisterDto): Promise<User> {
    const {firstName,lastName,email,password} = createRegisterdto;
    const userExists = await this.userRepository.findOne({where:{email}})
    if (userExists) {
      throw new error('Unsucessful!! Email already exists');
    }

    const hashedpassword =  await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({ firstName, lastName, email, password: hashedpassword });
    return this.userRepository.save(user);

  }

  async getUser(): Promise<User[]> {
    return this.userRepository.find();
  }
  findOne(id: number) {
    return `This action returns a #${id} register`;
  }

  update(id: number, updateRegisterDto: UpdateRegisterDto) {
    return `This action updates a #${id} register`;
  }

  remove(id: number) {
    return `This action removes a #${id} register`;
  }
}
