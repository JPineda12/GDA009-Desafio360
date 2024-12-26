import { jwtDecode } from 'jwt-decode';

const decodeToken = (token: string) => {
    try {
        const decoded = jwtDecode<{ id: number; email: string; role: string }>(token);
        return decoded;
    } catch (error) {
        return null;
    }
};

export default decodeToken;