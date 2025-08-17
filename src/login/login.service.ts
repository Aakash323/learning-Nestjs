import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateLoginDto } from './dto/update-login.dto';
import bcrypt from 'bcrypt';
import { User } from 'src/register/entities/register.entity';
import { Repository } from 'typeorm';
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
     private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

    async login(loginDto: CreateLoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokendata = { email: user.email, id: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(tokendata),
    };
  }
  
}


