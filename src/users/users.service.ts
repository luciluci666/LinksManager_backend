import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';

import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const data = Object(createUserDto);
    
    let exist = false;
    this.userModel.find({ username: data.username }).exec((error, user) => {  
      if (user.length > 0){ 
        exist = true ;
      };
    })
    this.userModel.find({ email: data.email }).exec((error, user) => {
      if (user.length > 0){ 
        exist = true ;
      }
    })

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(data.password, salt);
    data.password = hash;

    if (exist){   
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Username or email already exists',
      }, HttpStatus.FORBIDDEN);
    }
    return new this.userModel(data).save();
  }
  async findAll() {
    return this.userModel.find();
  }

  async findOne(username: string) {
    return this.userModel.findOne({ username });
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ username }, { $set: { ...updateUserDto } });
  }

  async remove(username: string) {
    return this.userModel.deleteOne({ username });
  }
}
