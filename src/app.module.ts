import { Module } from '@nestjs/common';
import { ProfsModule } from "./find-profs/profs.module";

@Module({
  imports: [ProfsModule],
})
export class AppModule {}
