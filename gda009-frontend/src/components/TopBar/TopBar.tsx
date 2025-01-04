import React, { useState } from 'react';
import { IconButton, AppBar, Toolbar, Typography, Button, Box, Badge } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useAuth } from '../../shared/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartDropdown from '../ShoppingCart/DropdownCart';
import RolEnum from '../../shared/utils/RolEnum';
import InventoryIcon from '@mui/icons-material/Inventory';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import PeopleIcon from '@mui/icons-material/People';
import { useCart } from '../../shared/context/ShoppingCartContext';


const TopBar: React.FC = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();
    const { cartItems } = useCart();

    const [elementoPadre, setElementoPadre] = useState<null | HTMLElement>(null);

    const handleCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setElementoPadre(event.currentTarget);
    };

    const handleCloseCart = () => {
        setElementoPadre(null);
    };


    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    };

    const redirectToHome = () => {
        if (user?.idRol === RolEnum.CLIENTE) {
            navigate('/customer/home');
        } else if (user?.idRol === RolEnum.ADMIN) {
            navigate('/operator/home');
        } else {
            handleLogout();
        }
    }

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton onClick={redirectToHome}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <StorefrontIcon />
                </IconButton>
                <Typography variant="h6" sx={{ mr: 5 }}>
                    MI TIENDITA ONLINE
                </Typography>
                {isAuthenticated() ? (
                    <>
                        <Box sx={{ flexGrow: 1 }}>
                            {user?.idRol === RolEnum.CLIENTE ?
                                <>
                                    <IconButton size="large"
                                        color="inherit" sx={{ m: "auto" }}
                                        onClick={handleCartClick}>
                                        <Badge color="warning" badgeContent={cartItems.length}>
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </IconButton>
                                    <CartDropdown elementoPadre={elementoPadre} onClose={handleCloseCart} />
                                </>
                                :
                                <>
                                    <Button variant="outlined" color="inherit" startIcon={<FilterFramesIcon />} sx={{ mr: 1 }}>
                                        Ordenes
                                    </Button>
                                    <Button variant="outlined" color="inherit" 
                                    startIcon={<AutoStoriesIcon />} sx={{ mr: 1 }} component={Link} to="/operator/categories">
                                        Categorias
                                    </Button>
                                    <Button variant="outlined" color="inherit" startIcon={<InventoryIcon />} sx={{ mr: 1 }}>
                                        Productos
                                    </Button>
                                    <Button variant="outlined" color="inherit" startIcon={<PeopleIcon />} sx={{ mr: 1 }}>
                                        Usuarios
                                    </Button>
                                </>

                            }
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
                                Cerrar Sesión
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Button color="inherit" component={Link} to="/auth/login">
                                Login
                            </Button>
                        </Box>
                    </>
                )}
            </Toolbar>
        </AppBar >
    );
};

export default TopBar;
