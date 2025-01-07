import { OrderDetailInterface } from "../shared/interfaces/OrderDetailInterface";
import { OrderCreateInterface, OrderRejectInterface, UserOrderInterface } from "../shared/interfaces/OrderInterface";
import httpClient from "./http-client";


export const ordersGetAll = async (): Promise<UserOrderInterface[]> => {
    return await httpClient('/orders/list', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
};

export const ordersById = async (id: number): Promise<UserOrderInterface> => {
    return await httpClient(`/orders/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
};

export const ordersByUserId = async (userId: number): Promise<UserOrderInterface[]> => {
    return await httpClient(`/orders/user/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
};


export const orderDetail = async (orderId: number): Promise<OrderDetailInterface[]> => {
    return await httpClient(`/orders/${orderId}/detail`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
};



export const orderCreate = async (orderCreate: OrderCreateInterface): Promise<UserOrderInterface> => {
    return await httpClient(`/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderCreate)
    });
};

export const orderUpdate = async (orderUpdate: OrderCreateInterface): Promise<UserOrderInterface> => {
    return await httpClient(`/orders`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderUpdate)
    });
};

export const orderDeliver = async (orderId: number): Promise<UserOrderInterface> => {
    return await httpClient(`/orders/deliver/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    });
};

export const orderReject = async (orderReject: OrderRejectInterface): Promise<UserOrderInterface> => {
    return await httpClient(`/orders/reject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderReject)
    });
};