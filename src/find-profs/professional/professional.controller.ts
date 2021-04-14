import { Body, Controller, Get, Param } from "@nestjs/common";
import { ProfessionalService } from './professional.service';
import { Professional } from "../entities/Professional";

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

  @Get('one_by_id/:id')
  async getProfById(@Param('id') id: number): Promise<Professional> {
    return await this.professionalService.findProfById(id);
  }

  @Get('one_by_id_with_review/:id')
  async getProfByIdWithReview(@Param('id') id: number): Promise<Professional> {
    return await this.professionalService.findProfByIdWithReview(id);
  }


  @Get('one_by_name_with_review')
  async getProfByFirstLastNameWithReview(@Body() body): Promise<Professional> {
    const { firstName, lastName } = body;
    console.log(body);
    console.log(`firstName: ${firstName}, lastName: ${lastName}`);
    return await this.professionalService.findProfByFirstLastName(firstName, lastName);
  }

}

















