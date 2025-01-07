export interface UserLoggedInterface{
    id: number
    email: string
    nombre: string
    idRol: number
}

export interface UserInterface{
    id?: number,
    correo_electronico: string,
    nombre_completo: string,
    nombre?: string,
    password: string,
    fecha_nacimiento: string,
    telefono?: string,
    razon_social?: string,
    nombre_comercial?: string,
    direccion_entrega?: string
    idEstado: number,
    estado?: string,
    idRol: number,
    rol?: string,
    fecha_creacion?: string,
    fecha_modificacion?: string,
}