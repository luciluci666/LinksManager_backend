import { Controller, UseGuards, Request, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UnauthorizedException } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get(':username')
  findOne(@Request() request, @Param('username') username: string) {
    if (request.user.username === username){
      return this.usersService.findOne(username);
    }
    else{
      throw new UnauthorizedException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':username')
  update(@Request() request, @Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
    if (request.user.username === username){
    return this.usersService.update(username, updateUserDto);
    } else{
      throw new UnauthorizedException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':username')
  remove(@Request() request, @Param('username') username: string) {
    if (request.user.username === username){
    return this.usersService.remove(username);
    } else{
      throw new UnauthorizedException();
    }
  }
}
