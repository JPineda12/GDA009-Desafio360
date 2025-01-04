import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';

const MainLayout: React.FC = () => {
  return (
    <Box sx={{
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <TopBar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
        }}>
        <Outlet />
      </Box>
    </Box>
  );

}
export default MainLayout;
