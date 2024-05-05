export interface Suscription {
  id: number,
  TipoServicio_S: string,
  Precio_S: number,
  Descripcion_S: string,
  DescripcionAdmin?: string,
  DescripcionList?: string[]
}

export interface CreateSuscriptionDTO extends Omit<Suscription, 'id' | 'DescripcionList'>{ }

