export interface ProductCategoryInterface {
    id: number;
    nombre: string;
    idEstado: number;
    estado: string;
    fecha_creacion: string;
    fecha_modificacion: string;
    usuario_creador: string;
}

export interface CategoriaForm {
  id?: number;
  nombre: string;
  idEstado: number;
}