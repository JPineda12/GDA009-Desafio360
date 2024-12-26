import { AppBar, Toolbar, Typography, Box, Button, IconButton} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Login from '../pages/auth/Login';

const MainLayout: React.FC = () => (
  <Box sx={{ 
    flexGrow: 1, 
    display: 'flex', 
    flexDirection: 'column', 
    minHeight: '100vh'}}>
    <AppBar position="static">
      <Toolbar>
        <IconButton href="/home"
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <StorefrontIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MI TIENDITA ONLINE
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <Login />
    </Box>
  </Box>
);

export default MainLayout;
