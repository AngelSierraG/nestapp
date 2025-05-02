import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TiposCabanas')
export class TiposCabanas {
  @PrimaryGeneratedColumn()
  idTipo: number;

  @Column({ unique: true })
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column()
  cantidad: number;

  @Column()
  urlImage: string;

  @Column()
  capacidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precioPlataforma: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  comision: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  iva: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  pax: number;

  @Column({ type: 'boolean', default: false })
  paxCheck: boolean;
}