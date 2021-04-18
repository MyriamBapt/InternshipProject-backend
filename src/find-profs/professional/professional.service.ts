import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import {validate} from "class-validator";

import { Professional } from "../entities/Professional";
import { ProfessionnalDto } from "../model/professionnal.dto";
import { Review } from "../entities/Review";

@Injectable()
export class ProfessionalService {

  constructor(
    @InjectRepository(Professional)
    private readonly profRepo: Repository<Professional>
  ) {}

  async findAllProfessionals(): Promise<Professional[] | undefined> {
    const allProfs = await this.profRepo.find();

    if (!allProfs) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The professional was not found baby!!',
      }, HttpStatus.NOT_FOUND);
    }

    return allProfs;
  }

  async findAllProfsWithReview(): Promise<Professional[] | undefined> {
    const allProfs = await this.profRepo
      .createQueryBuilder('professional')
      .leftJoinAndSelect("professional.review", "review")
      .getMany();

    if (!allProfs) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The professional was not found baby!!',
      }, HttpStatus.NOT_FOUND);
    }

    return allProfs;
  }

  async findAllProfsWithReview2(): Promise<Professional[] | undefined> {
    const allProfs = await this.profRepo
      .query('select p.*, r.*, count(r.id) as total_reviews\n' +
        'from professionals p\n' +
        'left join reviews r on p.id = r."professionalId"\n' +
        'group by p.id\n' +
        'order by total_reviews desc');

      /*.createQueryBuilder('professional')
      .addSelect("count(reviews.id) as reviews_total")
      .leftJoinAndSelect("professional.review", "review")
      .groupBy("professional.id")
      .getRawMany();*/

    if (!allProfs) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The professional was not found baby!!',
      }, HttpStatus.NOT_FOUND);
    }

    return allProfs;
  }

  async findProfById(id: number): Promise<Professional | undefined> {
    const prof = await this.profRepo
      .createQueryBuilder('professional')
      .where("professional.id = :id", { id: id })
      .getOne();

    if (!prof) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The professional was not found baby!!',
      }, HttpStatus.NOT_FOUND);
    }

    return prof;
  }


  async findProfByIdWithReview(id: number): Promise<Professional | undefined> {
    const prof = await this.profRepo
      .createQueryBuilder('professional')
      .leftJoinAndSelect("professional.review", "review")
      .innerJoinAndSelect("review.user", "user")
      .where("professional.id = :id", { id: id })
      .getOne();

    if (!prof) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `The professional with id ${id} was not found`,
      }, HttpStatus.NOT_FOUND);
    }

    return prof;
  }


  async findProfByFirstLastName(firstName: string, lastName: string): Promise<Professional | undefined> {
    const prof = await this.profRepo
      .createQueryBuilder('professional')
      .innerJoinAndSelect("professional.review", "review")
      .where("professional.first_name = :firstname", { firstname : firstName })
      .andWhere("professional.last_name = :lastname", { lastname : lastName })
      .getOne();

    if (!prof) {
      throw new HttpException( {
        status: HttpStatus.NOT_FOUND,
        error: `The professional's name ${firstName} was not found`
      }, HttpStatus.NOT_FOUND);
    }

    return  prof;
  }

  async addNewProfessional(professional: ProfessionnalDto): Promise<Professional | undefined> {
    const addedProf = await this.profRepo
      .create({
          first_name: professional.firstName,
          last_name: professional.lastName,
          email: professional.email,
          phone: professional.phone,
          city: professional.city,
          occupation: professional.occupation,
          years_activity: professional.yearsActivity,
          specs: professional.specs,
          first_meeting_price: professional.firstMeetingPrice,
          followup_meeting_price: professional.followupMeetingPrice,
          avatar_url: professional.avatarUrl
        });

    const errors =await validate(addedProf);
    if (errors.length > 0) {
      throw new HttpException( {
        status: HttpStatus.BAD_REQUEST,
        error: errors[0].constraints,
      }, HttpStatus.BAD_REQUEST);
    }

    return await this.profRepo.save(addedProf);
  }

}

// error: ValidationError













