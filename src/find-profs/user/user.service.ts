import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { ReviewsDto } from '../model/reviews.dto';
import { Review } from '../entities/Review';
import { validate } from 'class-validator';
import { UserDto } from '../model/user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async findAllUsers(): Promise<User[] | undefined> {
    const allUsers = await this.userRepo.find();

    if (!allUsers){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error:'Could not find users',
      }, HttpStatus.NOT_FOUND);
    }
    return allUsers;
  }

  async findAllUsersWithWeight(): Promise<User[] | undefined>{
    const allUsersWithWeight = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect("user.userWeight", "userWeight")
      .getMany();

    if (!allUsersWithWeight){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error:'Could not find users with weight',
      }, HttpStatus.NOT_FOUND);
    }
    return allUsersWithWeight;
  }

  async findUserById(id: number): Promise<User | undefined>{
    const userById = this.userRepo
      .createQueryBuilder('user')
      .where("user.id = :id", {id: id})
      .getOne();

    if (!userById){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error:'Could not find users by id',
      }, HttpStatus.NOT_FOUND);
    }
    return userById;

  }

  async findUserWeightById(id: number): Promise<User | undefined>{
    const userWeightById = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect("user.userWeight", "userWeight")
      .where("user.id = :id", { id: id })
      .getOne();

    if (!userWeightById){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error:'Could not find user',
      }, HttpStatus.NOT_FOUND);
    }
    return userWeightById;
  }

  async updateUser(user: User): Promise<User | undefined > {
    return await this.userRepo.save(user);
    //need to be finished and tested
  }

}
