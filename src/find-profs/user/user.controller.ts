import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/User';
import { UserDto } from '../model/user.dto';
import { validate } from 'class-validator';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get ('all')
  async getAllUsers(): Promise<User[]>{
    return await this.userService.findAllUsers();
  }

  @Get ('all_with_weight')
  async getAllUsersWithWeight(): Promise<User[]>{
    return await this.userService.findAllUsersWithWeight();
  }

  @Get ('user_by_id/:id')
  async getUserById
      (@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
       id: number
      ): Promise<User>{
    return await this.userService.findUserById(id);
  }

  @Get ('user_by_id_weight/:id')
  async getUserWeightById
  (@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
     id: number
  ): Promise<User>{
    return await this.userService.findUserWeightById(id);
  }

  @Post ('update_user/:id')
  async updateUserById
  (@Body() body): Promise<User>{
    const { user } = body;
    return await this.userService.updateUser(user)
    //need to be finished and tested
  }

}
