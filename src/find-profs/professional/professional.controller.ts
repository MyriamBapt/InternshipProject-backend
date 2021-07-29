import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ProfessionalService } from './professional.service';
import { Professional } from "../entities/Professional";
import { ProfessionnalDto } from "../model/professionnal.dto";
import { InsertResult } from "typeorm";
import { validate } from "class-validator";

@Controller('professional')
export class ProfessionalController {

  constructor(private professionalService: ProfessionalService) {
  }

  @Get('all')
  async getAllProfs(): Promise<Professional[]> {
    return await this.professionalService.findAllProfessionals();
  }

  @Get('all_with_review')
  async getAllProfsWithReview(): Promise<Professional[]> {
    return await this.professionalService.findAllProfsWithReview();
  }

  @Get('all_with_review2')
  async getAllProfsWithReview2(): Promise<Professional[]> {
    return await this.professionalService.findAllProfsWithReview2();
  }

  @Get('one_by_id/:id')
  async getProfById(
      @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
      id: number,
  ): Promise<Professional> {
    return await this.professionalService.findProfById(id);
  }

  @Get('one_by_id_with_review/:id')
  async getProfByIdWithReview(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
      id: number,
  ): Promise<Professional> {
    return await this.professionalService.findProfByIdWithReview(id);
  }


  @Get('by_name_with_review/:name')
  async getProfByFirstLastNameWithReview(
    @Param('name') name: string
  ): Promise<Professional[]> {
    console.log(`--------------  Param name: ${name}`);
    return await this.professionalService.findProfByFirstLastName(name);
  }

 @Post('post_new_prof')
  async postNewProf(@Body() body): Promise<Professional> {

    const {
      firstName, lastName, email, phone, city,
      occupation, yearsActivity,
      firstMeetingPrice, followupMeetingPrice, avatarUrl, description
    } = body;
    console.log(`FIRST NAME: ${firstName}`);

    const newProf = new ProfessionnalDto();
    newProf.firstName = firstName;
    newProf.lastName = lastName;
    newProf.email = email;
    newProf.phone = phone;
    newProf.city = city;
    newProf.occupation = occupation;
    newProf.yearsActivity = yearsActivity;
    newProf.firstMeetingPrice = firstMeetingPrice;
    newProf.followupMeetingPrice = followupMeetingPrice;
    newProf.avatarUrl = avatarUrl;
    newProf.description = description;

    const errors = await validate(newProf);
    if (errors.length > 0) {
      throw new Error(`Validation failed!`);
    }

    return await this.professionalService.addNewProfessional(newProf);
 }

 @Get('all_with_tag_language')
  async getAllWithTagAndLanguage(): Promise<Professional[]>{
    return await this.professionalService.findAllWithTagAndLanguage();
 }

  @Get('one_with_tag_language/:id')
  async getOneWithTagAndLanguage(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
        id: number
        ): Promise<Professional>{
    return await this.professionalService.findOneWithTagAndLanguage(id);
  }

}

















