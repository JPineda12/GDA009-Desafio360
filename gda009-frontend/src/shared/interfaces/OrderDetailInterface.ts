export interface OrderDetailInterface {
    id: number;
    idOrden: number;
    idProducto: number;
    producto: string;
    codigo: string;
    imagen_url: string;
    marca: string;
    precio: number;
    cantidad: number;
    subtotal: number;
    fecha_creacion: string;
    fecha_modificacion: string;
  }

  export interface OrderCreateDetailInterface{
    Producto_idProducto: number,
    cantidad: number,
    precio: number,
    subtotal: number
  }