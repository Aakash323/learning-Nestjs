import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';

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
