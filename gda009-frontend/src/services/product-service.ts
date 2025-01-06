import { ProductInterface } from "../shared/interfaces/ProductInterface";
import httpClient from "./http-client";


export const productList = async (): Promise<ProductInterface[]> => {
    return await httpClient('/products/list', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
};

export const productById = async (id: number): Promise<ProductInterface> => {
    return await httpClient(`/products/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
};

export const productCreate = async (newProduct: ProductInterface): Promise<ProductInterface> => {
    return await httpClient('/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
    });
};


export const productUpdate = async (product: ProductInterface, productId: number): Promise<ProductInterface> => {
    return await httpClient(`/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
};

export const productDelete = async (id: number): Promise<ProductInterface> => {
    return await httpClient(`/products/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
};
