import { Controller, Get, Param } from "@nestjs/common";
import { RendezVousService } from "./rendez-vous.service";
import { RendezVous } from "../entities/RendezVous";

@Controller('rendezvous')
export class RendezVousController {

  constructor(private rendezvousService: RendezVousService ) {
  }

  @Get('all_by_prof_id/:id')
  async getAllRendezVousByProfId(@Param('id') id: number): Promise<RendezVous[]> {
    return await this.rendezvousService.findAllRendezVousByProfId(id);
  }

}
