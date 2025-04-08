import { Partner } from 'src/partners/entities/partner.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  UserId: number;

  @Column({ length: 50 })
  Username: string;

  @Column({ length: 800 })
  PasswordHash: string;

  @Column({ length: 100 })
  Email: string;

  @Column({ length: 15, nullable: true })
  PhoneNumber: string;

  @Column({ length: 255, nullable: true })
  Address: string;

  @Column({ length: 255, nullable: true })
  PhotoUrl: string;

  @ManyToOne(() => Partner, partner => partner.users) @JoinColumn({ name: 'PartnerId' })  
  Partner: Partner
  
  @Column({ default: false })
  IsDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  CreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  UpdatedAt: Date;
}
