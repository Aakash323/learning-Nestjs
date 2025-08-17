import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/register.entity';
import { Repository } from 'typeorm';
import { CreateRegisterDto } from './dto/create-register.dto';
import { error } from 'console';
import bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createRegisterdto: CreateRegisterDto): Promise<User> {
    const { firstName, lastName, email, password } = createRegisterdto;
    const userExists = await this.userRepository.findOne({ where: { email } });
    if (userExists) {
      throw new BadRequestException('Unsucessful!! Email already exists');
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedpassword,
    });
    return this.userRepository.save(user);
  }

  async getUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async update(id: number,updateRegisterDto: UpdateRegisterDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new BadRequestException('User with given id doesnt exist');
    }

    if (updateRegisterDto.email && updateRegisterDto.email !== user?.email) {
      const emailExists = await this.userRepository.findOne({
        where: { email: updateRegisterDto.email },
      });

      if (emailExists) {
        throw new BadRequestException(
          'Unsucessful!! Email already exists. Choose new email',
        );
      }
    }

    if (updateRegisterDto.password) {
      updateRegisterDto.password = await bcrypt.hash(
        updateRegisterDto.password,
        10,
      );
    }

    Object.assign(user, updateRegisterDto);
    return this.userRepository.save(user);
  }

  async remove(id: number):Promise<{message:string}> {
    const user = await this.userRepository.findOne({
      where:{id:id}
    })

    if(!user){
      throw new BadRequestException('User with given id doesnt exist')
    }

    await this.userRepository.remove(user)


  return {message:'User removed sucessfullt'}
  }
}


