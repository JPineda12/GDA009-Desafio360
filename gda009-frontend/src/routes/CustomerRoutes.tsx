import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/home/Home';
import Cart from '../pages/cart/Cart';
import OrderHistory from '../pages/orders/OrderHistory';

const CustomerRoutes: React.FC = () => (
  <Routes>
    <Route path="home" element={<Home />} />
    <Route path="cart" element={<Cart />} />
    <Route path="orders" element={<OrderHistory />} />

    <Route path="*" element={<Navigate to="/customer/home" replace />} />
  </Routes>
);

export default CustomerRoutes;
