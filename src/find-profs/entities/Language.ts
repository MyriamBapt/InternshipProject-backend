import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Professional } from './Professional';

@Entity()
export class Language {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable:false
  })
  spokenLanguage: string;

 @ManyToOne(
   () => Professional,
   (professional) => professional.language
 )
  public professional: Professional;

}
