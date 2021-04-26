import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Professional } from './Professional';

@Entity()
export class Tag {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'boolean',
    nullable: false
  })
  friendly: boolean;

  @Column({
    type: 'boolean',
    nullable: false
  })
  understanding: boolean;

  @Column({
    type: 'boolean',
    nullable: false
  })
  punctuality: boolean;

  @Column({
    type: 'boolean',
    nullable: false
  })
  efficiency: boolean;

  @ManyToOne(
    () => Professional,
    (professional) => professional.tag
  )
  public professional: Professional;
}
