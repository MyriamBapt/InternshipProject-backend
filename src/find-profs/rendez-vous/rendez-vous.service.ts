import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RendezVous } from "../entities/RendezVous";
import { Repository } from "typeorm";

@Injectable()
export class RendezVousService {

  constructor(
    @InjectRepository(RendezVous)
    private readonly rendRepo: Repository<RendezVous>
  ) {}

  async findAllRendezVousByProfId(profId: number): Promise<RendezVous[] | undefined> {
    const allRendezvous = await this.rendRepo
      .createQueryBuilder('rendezvous')
      .innerJoinAndSelect("rendezvous.user", "user")
      .innerJoinAndSelect("rendezvous.professional", "professional")
      .where("professional.id = :id", { id: profId })
      .getMany();

    if (!allRendezvous) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The professional was not found baby!!',
      }, HttpStatus.NOT_FOUND);
    }

    return allRendezvous;
  }

  async findAllByProfAndDate(profId: number, date_rdv: string): Promise<RendezVous[] | undefined> {
    const allRendezvous = await this.rendRepo
      .createQueryBuilder('rendezvous')
      .innerJoinAndSelect("rendezvous.professional", "professional")
      .where("professional.id = :id", { id: profId })
      .andWhere("rendezvous.date_rdv = :date_rdv" , { date_rdv: date_rdv })
      .getMany();

    if (!allRendezvous) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'No rendez-vous found ',
      }, HttpStatus.NOT_FOUND);
    }

    return allRendezvous;
  }


}














