import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInterface from '../interfaces/UserInterface';
import { useNotification } from './NotificationProvider';
import RolEnum from '../utils/RolEnum';

interface AuthContextType {
    token: string | null;
    user: UserInterface | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [user, setUser] = useState<UserInterface | null>(token ? jwtDecode<UserInterface>(token) : null);
    const navigate = useNavigate();
    const { notify } = useNotification();

    useEffect(() => {
        if (token) {
            const decodedToken: any = jwtDecode(token);
            const isExpired = decodedToken.exp * 1000 < Date.now();
            if (isExpired) {
                logout();
                notify('Session expired. Please log in again.', 'error');
            }
        }
    }, [token])
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            setUser(jwtDecode<UserInterface>(token));
        } else {
            localStorage.removeItem('token');
            setUser(null);
        }
    }, [token]);

    const login = (newToken: string) => {
        setToken(newToken);
        const user = jwtDecode<UserInterface>(newToken)
        setUser(user);
        if (user.idRol === RolEnum.CLIENTE) {
            notify('Sesión iniciada!', 'success');
            navigate('/customer/home');
        }else if(user.idRol === RolEnum.ADMIN || user.idRol === RolEnum.CLIENTE){
            navigate('/operator/home');
            notify('Sesión iniciada!', 'success');
        }else{
            notify('Error, rol desconocido de usuario', 'error')
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem('cart');
        setToken(null);
        setUser(null);
        navigate('/auth/login');
        notify('Sesion cerrada.');
    };

    const isAuthenticated = () => !!token;
    return (
        <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
