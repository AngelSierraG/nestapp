// src/cabanas/entities/cabana.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cabanas')
export class Cabana {
  @PrimaryGeneratedColumn()
  idCabana: number;

  @Column({ length: 200 })
  cabanaName: string;

  @Column({ length: 200, nullable: true })
  image: string;

  @Column({ length: 200, nullable: true })
  typeCabana: string;

  @Column('mediumtext')
  description: string;

  @Column('smallint')
  price: number;

  @Column('smallint')
  pax: number;

  @Column('smallint')
  capacity: number;
}
