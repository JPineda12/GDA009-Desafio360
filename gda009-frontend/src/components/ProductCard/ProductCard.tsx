import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { CartItem } from '../../shared/interfaces/ShoppingCartInterface';
import { useCart } from '../../shared/context/ShoppingCartContext';
import { ProductInterface } from '../../shared/interfaces/ProductInterface';

const ProductCard: React.FC<{ product: ProductInterface }> = ({ product }) => {
    const { cartItems, setCartItems } = useCart();

    function mapToCartItem(product: ProductInterface): CartItem {
        return {
            id: product.id,
            nombre: product.nombre,
            imagen_url: product.imagen_url || "",
            marca: product.marca,
            precio: product.precio,
            cantidad: 1
        };
    }

    const handleCartClick = () => {
        const existingItem = cartItems.find(item => item.id === product.id);
        let shoppingCart: CartItem[];

        if (existingItem) {
            shoppingCart = cartItems.map(item =>
                item.id === product.id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            );
        } else {
            shoppingCart = [...cartItems, mapToCartItem(product)];
        }
        setCartItems(shoppingCart);
    };

    return (
        <Card
            key={product.id}
            sx={{
                cursor: 'pointer',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                boxShadow: 3,
                ':hover': { boxShadow: 6 },
            }}>
            <CardMedia
                component="img"
                height="200"
                image={product.imagen_url}
                alt={product.nombre}
            />
            <CardContent>
                <Typography variant="h6" component="div" noWrap>
                    {product.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.categoria} - {product.marca}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.codigo} - Stock: {product.stock}
                </Typography>                
                <Typography variant="subtitle1" color="primary">
                    Q.{product.precio.toFixed(2)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="outlined" color="success" sx={{ m: "auto" }}
                    onClick={handleCartClick} >
                    <AddShoppingCartIcon />
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
