import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RendezVousController } from './rendez-vous.controller';
import { RendezVousService } from './rendez-vous.service';
import { RendezVous } from "../entities/RendezVous";

@Module({
  imports: [TypeOrmModule.forFeature([RendezVous])],
  controllers: [RendezVousController],
  providers: [RendezVousService],
  exports: [TypeOrmModule]
})
export class RendezVousModule {}
