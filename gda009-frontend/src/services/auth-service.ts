import httpClient from "./http-client";

interface LoginResponse {
    token: string;
}

const login = async (correo_electronico: string, password: string): Promise<LoginResponse> => {
    return await httpClient('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo_electronico, password }),
    });
};

export default {
    login,
};
