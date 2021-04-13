import { Module } from '@nestjs/common';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Professional } from "../entities/Professional";

@Module({
  imports: [TypeOrmModule.forFeature([Professional])],
  controllers: [ProfessionalController],
  providers: [ProfessionalService],
  exports: [TypeOrmModule]
})
export class ProfessionalModule {}
