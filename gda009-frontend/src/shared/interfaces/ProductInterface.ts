export interface UserLoggedInterface{
    id: number
    email: string
    nombre: string
    idRol: number
}

export interface ProductInterface{
    id?: number,
    nombre: string,
    marca: string,
    codigo: string,
    stock: number,
    precio: number,
    imagen_url?: string,
    idCategoria: number,
    categoria?: string,
    idEstado: number,
    estado?: string,
    fecha_creacion?: string,
    fecha_modificacion?: string,
    imagen_base64?: string | null | ArrayBuffer,
}