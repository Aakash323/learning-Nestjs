import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/register.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
