import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Professional } from "../entities/Professional";
import { Repository } from "typeorm";

@Injectable()
export class ProfessionalService {

  constructor(
    @InjectRepository(Professional)
    private readonly profRepo: Repository<Professional>
  ) {}

  async findAllProfessionals(): Promise<Professional[]> {
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
      .where("professional.id = :id", { id: id })
      .getOne();

    if (!prof) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `The professional's id ${id} was not found`,
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

}















