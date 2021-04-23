import { Controller, Get, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/User';

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


}
