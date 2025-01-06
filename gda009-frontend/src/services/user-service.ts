import { UserInterface } from "../shared/interfaces/UserInterface";
import httpClient from "./http-client";

export const userList = async (): Promise<UserInterface[]> => {
    return await httpClient('/users/list', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
};

export const userById = async (id: number): Promise<UserInterface> => {
    return await httpClient(`/users/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
};

export const userCreate = async (newUser: UserInterface): Promise<UserInterface> => {
    return await httpClient('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
    });
};

export const userUpdate = async (user: UserInterface): Promise<UserInterface> => {
    return await httpClient(`/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
};

export const deleteUser = async (id: number): Promise<UserInterface> => {
    return await httpClient(`/users/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
};
