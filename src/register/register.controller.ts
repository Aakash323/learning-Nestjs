import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { error } from 'console';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  create(
    @Body() createRegisterDto: CreateRegisterDto) {
    return this.registerService.create(createRegisterDto);
  }

  @Get()
  findAll() {
    return this.registerService.getUser();
  }              

  @Get(':id')
  findById(
    @Param('id') id:string,
  ){
   const Id = parseInt(id)
    if(!id || isNaN(Id)){
        throw new BadRequestException('Invalid user Id');
    }
      return this.registerService.getUserById(Id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegisterDto: UpdateRegisterDto) {
    return this.registerService.update(parseInt(id), updateRegisterDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string) {
    return this.registerService.remove(parseInt(id));
  }
}
