import { ApiProperty } from '@nestjs/swagger';

export class CreateTiposCabanasDto {
  @ApiProperty({ example: 'Cabaña del Lago', description: 'Nombre único de la cabaña' })
  nombre: string;

  @ApiProperty({ example: 'Cabaña con vista al lago', description: 'Descripción de la cabaña' })
  descripcion: string;

  @ApiProperty({ example: 5, description: 'Cantidad disponible de esta cabaña' })
  cantidad: number;

  @ApiProperty({ example: 'https://mi-servidor.com/images/lago.jpg', description: 'URL de la imagen' })
  urlImage: string;

  @ApiProperty({ example: 2, description: 'Capacidad máxima de huéspedes' })
  capacidad: number;

  @ApiProperty({ example: 1200, description: 'Precio por noche' })
  precio: number;

  @ApiProperty({ example: 1300, description: 'Precio en plataformas externas' })
  precioPlataforma: number;

  @ApiProperty({ example: 10, description: 'Porcentaje de comisión aplicado' })
  comision: number;

  @ApiProperty({ example: 16, description: 'IVA aplicado al precio' })
  iva: number;

  @ApiProperty({ example: 200, description: 'Precio adicional por persona extra' })
  pax: number;

  @ApiProperty({ example: true, description: 'Define si se cobra por persona o no' })
  paxCheck: boolean;
}