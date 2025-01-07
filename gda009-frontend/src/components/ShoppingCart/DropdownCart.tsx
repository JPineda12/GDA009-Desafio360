import React from 'react';
import { Menu, MenuItem, Box, Avatar, Typography, IconButton, Divider, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CartItem } from '../../shared/interfaces/ShoppingCartInterface';
import { useCart } from '../../shared/context/ShoppingCartContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNotification } from '../../shared/context/NotificationProvider';
import { orderCreate } from '../../services/order-service';
import { useAuth } from '../../shared/context/AuthContext';
import { userById } from '../../services/user-service';
import { UserInterface } from '../../shared/interfaces/UserInterface';
import EstadoEnum from '../../shared/utils/EstadoEnum';
import { OrderCreateInterface } from '../../shared/interfaces/OrderInterface';
import { useNavigate } from 'react-router-dom';

interface ShoppingCartProps {
    elementoPadre: HTMLElement | null;
    onClose: () => void;
}

const CartDropdown: React.FC<ShoppingCartProps> = ({ elementoPadre: anchorEl, onClose }) => {
    const { cartItems, setCartItems, clearCart } = useCart();
    const { user } = useAuth();
    const { notify } = useNotification();
    const navigate = useNavigate();

    const updateQuantity = (id: number, quantToAdd: number) => {
        const updatedCart = cartItems.map((item: CartItem) =>
            item.id === id ? { ...item, cantidad: item.cantidad + quantToAdd } : item
        ).filter(item => item.cantidad > 0);

        setCartItems(updatedCart);
    };

    const deleteItem = (id: number) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
    };

    const mapUserAndCartToOrder = (userInfo: UserInterface): OrderCreateInterface => {
        return {
            usuario_idUsuario: userInfo.id!,
            estado_idEstado: EstadoEnum.PENDIENTE,
            nombre_completo: userInfo.nombre_completo,
            direccion: userInfo.direccion_entrega || "Dirección no proporcionada",
            telefono: userInfo.telefono || "Sin teléfono",
            correo_electronico: userInfo.correo_electronico,
            total_orden: cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0),
            detalles_orden: cartItems.map((item) => ({
                Producto_idProducto: item.id!,
                cantidad: item.cantidad,
                precio: item.precio,
                subtotal: item.precio * item.cantidad,
            })),
        };
    }

    const generarOrden = async () => {
        try {
            const userInfo = await userById(user?.id!)
            const orderMapped = mapUserAndCartToOrder(userInfo);
            await orderCreate(orderMapped);
            clearCart();
            notify('Order Generada satisfactoriamente')
            navigate('/customer/orders');
        } catch (error: any) {
            notify(error.message, 'error');
        }
    }

    const limpiarCarrito = async () => {
        clearCart();
    }    


    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: { maxHeight: 400, width: 400 },
                }
            }}
        >
            <Typography variant="subtitle2" align="center">CARRITO DE COMPRAS</Typography>
            <Divider sx={{ m: 1 }} />
            {cartItems.length === 0 ? (
                <MenuItem>
                    <Typography variant="body2" align="center" color="grey">No hay productos en el carrito.</Typography>
                </MenuItem>
            ) : (
                <>
                    {cartItems.map(item => (
                        <MenuItem key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>

                            <Avatar src={item.imagen_url} alt={item.nombre} sx={{ mr: 2, width: 48, height: 48 }} />
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="body1">{item.nombre}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {item.marca} - ${item.precio}
                                </Typography>
                                <Typography variant="caption">
                                    Cantidad: {item.cantidad}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                                <IconButton size="small" onClick={() => updateQuantity(item?.id!, -1)}>
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton size="small" onClick={() => updateQuantity(item.id!, 1)}>
                                    <AddIcon />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => deleteItem(item.id!)}
                                    sx={{ ml: 1 }}
                                >
                                    <DeleteForeverIcon />
                                </IconButton>
                            </Box>
                        </MenuItem>
                    ))}
                    <Divider></Divider>
                    <Box sx={{ textAlign: 'center' }}>
                    <Button sx={{mr: 2}} size='large' variant='outlined' color='error' onClick={() => limpiarCarrito()}>
                            Limpiar
                        </Button>                        
                        <Button size='large' variant='outlined' color='success' onClick={() => generarOrden()}>
                            Comprar
                        </Button>

                    </Box>
                </>
            )}
        </Menu>
    );
};

export default CartDropdown;
