import { Routes, Route, Navigate } from 'react-router-dom';
import ProductCRUD from '../pages/products/ProductCRUD';
import CategoryList from '../pages/product-category/CategoryList';
import OperatorHome from '../pages/operator-home/OperatorHome';
import UserCRUD from '../pages/user/UserCRUD';

const OperatorRoutes: React.FC = () => (
  <Routes>
    <Route path="home" element={<OperatorHome />} />
    <Route path="products" element={<ProductCRUD />} />
    <Route path="categories" element={<CategoryList />} />
    <Route path="users" element={<UserCRUD />} />
    
    <Route path="*" element={<Navigate to="/operator/home" replace />} />
  </Routes>
);

export default OperatorRoutes;
