import { CategoriaForm, ProductCategoryInterface } from "../shared/interfaces/ProductCategoryInterface";
import httpClient from "./http-client";

export const categoriesList = async (): Promise<ProductCategoryInterface[]> => {
    return await httpClient('/products-categories', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
};

export const categoryById = async (): Promise<ProductCategoryInterface> => {
    return await httpClient('/products-categories', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
};

export const createCategory = async (newCategory: CategoriaForm): Promise<ProductCategoryInterface> => {
    return await httpClient('/products-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory),
    });
};


export const updateCategory = async (updateCat: CategoriaForm, categoryId: number): Promise<ProductCategoryInterface> => {
    return await httpClient(`/products-categories/${categoryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateCat),
    });
};

export const deleteCategory = async (categoryId: number): Promise<ProductCategoryInterface> => {
    return await httpClient(`/products-categories/${categoryId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
};