import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import CustomerRoutes from './routes/CustomerRoutes';
import AuthRoutes from './routes/AuthRoutes';
import OperatorRoutes from './routes/OperatorRoutes';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/operator/*" element={<OperatorRoutes />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
