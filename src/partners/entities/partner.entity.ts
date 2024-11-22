import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('partners')
export class Partner {
  @PrimaryGeneratedColumn()
  PartnerId: number;

  @Column({ length: 100 })
  Company: string;

  @Column({ length: 500 })
  Slogan: string;

  @Column({ length: 500 })
  PhotoURL: string;

  @Column({ length: 1000 })
  Description: string;

  @Column({ length: 15 })
  PhoneNumber: string;

  @Column({ length: 100 })
  Email: string;

  @Column({ length: 255 })
  Address: string;

  @Column({ length: 800 })
  MapsURL: string;

  @Column('text')
  JsonData: string;

  @Column({ default: false })
  IsDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  CreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  UpdatedAt: Date;
}
