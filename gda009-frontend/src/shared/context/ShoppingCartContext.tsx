import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../interfaces/ShoppingCartInterface';

interface CartContextType {
    cartItems: CartItem[];
    setCartItems: (items: CartItem[]) => void;
}

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};


const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('shoppingCart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const updateCartItems = (items: CartItem[]) => {
        setCartItems(items);
        localStorage.setItem('shoppingCart', JSON.stringify(items));
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems: updateCartItems }}>
            {children}
        </CartContext.Provider>
    );
};
