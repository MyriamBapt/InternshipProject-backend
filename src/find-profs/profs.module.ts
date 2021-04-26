import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config';

import { UserModule } from "./user/user.module";
import { ProfessionalModule } from "./professional/professional.module";
import { RendezVousModule } from "./rendez-vous/rendez-vous.module";
import { ReviewModule } from "./review/review.module";

import { Professional } from "./entities/Professional";
import { User } from "./entities/User";
import { RendezVous } from "./entities/RendezVous";
import { Review } from "./entities/Review";
import { UserWeight } from './entities/UserWeight';
import { Tag } from './entities/Tag';
import { Language } from './entities/Language';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_DATABASE,
    entities: [
      Professional,
      User,
      RendezVous,
      Review,
      UserWeight,
      Tag,
      Language
    ],
    synchronize: Boolean(process.env.DB_SYNC)
    }),
    UserModule,
    ProfessionalModule,
    RendezVousModule,
    ReviewModule
  ]
})
export class ProfsModule {}












