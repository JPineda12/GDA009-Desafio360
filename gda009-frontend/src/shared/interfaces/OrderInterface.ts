import { OrderCreateDetailInterface } from "./OrderDetailInterface";

export interface UserOrderInterface {
    id: number;
    correo_usuario: string;
    idUsuario: number;
    estado: string;
    idEstado: number;
    nombre_completo: string;
    direccion: string;
    telefono: string;
    correo_orden: string;
    fecha_entrega: string | null;
    total_orden: number;
    fecha_creacion: string;
    fecha_modificacion: string;
  }
  

  export interface OrderCreateInterface{
    usuario_idUsuario: number,
    estado_idEstado: number,
    nombre_completo: string,
    direccion: string,
    telefono: string,
    correo_electronico: string,
    total_orden: number,
    detalles_orden: OrderCreateDetailInterface[]
  }

  export interface OrderRejectInterface{
    id: number,
    detalles_orden: OrderCreateDetailInterface[]
  }