import httpClient from "./http-client";

export interface ProductInterface {
    id: number;
    nombre: string;
    marca: string;
    codigo: string;
    stock: number;
    precio: number;
    imagen_url: string;
    categoria: string;
    idCategoria: number;
    idEstado: number;
    fecha_creacion: string;
    fecha_modificacion: string;
    idUsuario: number;
}

export const productList = async (): Promise<ProductInterface[]> => {
    return await httpClient('/products/list', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
};

export const productById = async (): Promise<ProductInterface> => {
    return await httpClient('/products/list', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
};

export const productCreate = async (): Promise<ProductInterface> => {
    return await httpClient('/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
};
