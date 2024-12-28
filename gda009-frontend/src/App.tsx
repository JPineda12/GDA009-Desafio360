import {Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthRoutes from './routes/AuthRoutes';
import CustomerRoutes from './routes/CustomerRoutes';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoute from './routes/PrivateRoutes';
import RolEnum from './utils/RolEnum';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Navigate to="/login" />} />

      {/* Public routes */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Private routes */}

      {/* Customer Routes */}
      <Route element={<PrivateRoute allowedRoles={[RolEnum.CLIENTE, RolEnum.ADMIN]} />} >
        <Route path="/customer/*" element={<CustomerRoutes />} />
      </Route>

      <Route path="/public/*" element={<PublicRoutes />} />

      {/*Unknown routes redirect to home */}
      <Route path="*" element={<Navigate to="/customer/home" replace />} />
    </Route>
  </Routes>
);

export default App;
