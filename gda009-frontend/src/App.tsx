import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './shared/layouts/MainLayout';
import AuthRoutes from './routes/AuthRoutes';
import CustomerRoutes from './routes/CustomerRoutes';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoute from './routes/PrivateRoutes';
import RolEnum from './shared/utils/RolEnum';
import OperatorRoutes from './routes/OperatorRoutes';
import { useAuth } from './shared/context/AuthContext';

const App: React.FC = () => {
  const { isAuthenticated, user } = useAuth(); // Obtienes el estado de autenticación y rol

  return (<Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Navigate to="/login" />} />

      {/* Public routes */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Private routes */}

      {/* Customer Routes */}
      <Route element={<PrivateRoute allowedRoles={[RolEnum.CLIENTE]} />} >
        <Route path="/customer/*" element={<CustomerRoutes />} />
      </Route>

      {/* Operator and Admin Routes */}
      <Route element={<PrivateRoute allowedRoles={[RolEnum.ADMIN, RolEnum.OPERADOR]} />} >
        <Route path="/operator/*" element={<OperatorRoutes />} />
      </Route>

      <Route path="/public/*" element={<PublicRoutes />} />

      {/*Unknown routes redirect to home */}
      <Route path="*"
        element={
          !isAuthenticated ? (
            <Navigate to="/auth/login" replace />
          ) : user?.idRol === RolEnum.CLIENTE ? (
            <Navigate to="/customer/home" replace />
          ) : user?.idRol === RolEnum.ADMIN || user?.idRol === RolEnum.OPERADOR ? (
            <Navigate to="/operator/home" replace />
          ) : (
            <Navigate to="/auth/login" replace />
          )
        }
      />
    </Route>
  </Routes>
  );
}
export default App;
