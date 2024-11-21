import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  UserId: number;

  @Column({ length: 50 })
  Username: string;

  @Column({ length: 256 })
  PasswordHash: string;

  @Column({ length: 100 })
  Email: string;

  @Column({ length: 15, nullable: true })
  PhoneNumber: string;

  @Column({ length: 255, nullable: true })
  Address: string;

  @Column({ length: 255, nullable: true })
  PhotoUrl: string;

  @Column({ default: false })
  IsDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  CreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  UpdatedAt: Date;
}
