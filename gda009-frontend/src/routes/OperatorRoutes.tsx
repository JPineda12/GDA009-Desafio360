import { Routes, Route, Navigate } from 'react-router-dom';
import ProductForm from '../pages/products/ProductForm';
import CategoryList from '../pages/product-category/CategoryList';
import CategoryForm from '../pages/product-category/CategoryForm';
import OperatorHome from '../pages/operator-home/OperatorHome';

const OperatorRoutes: React.FC = () => (
  <Routes>
    <Route path="home" element={<OperatorHome />} />
    <Route path="products/create" element={<ProductForm />} />
    <Route path="categories" element={<CategoryList />} />
    <Route path="categories/create" element={<CategoryForm />} />
    
    <Route path="*" element={<Navigate to="/operator/home" replace />} />
  </Routes>
);

export default OperatorRoutes;
