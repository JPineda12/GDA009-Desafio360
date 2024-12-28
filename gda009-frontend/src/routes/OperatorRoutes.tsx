import { Routes, Route } from 'react-router-dom';
import ProductList from '../pages/products/ProductList';
import ProductForm from '../pages/products/ProductForm';
import CategoryList from '../pages/product-category/CategoryList';
import CategoryForm from '../pages/product-category/CategoryForm';

const OperatorRoutes: React.FC = () => (
  <Routes>
    <Route path="/products" element={<ProductList />} />
    <Route path="/products/create" element={<ProductForm />} />
    <Route path="/categories" element={<CategoryList />} />
    <Route path="/categories/create" element={<CategoryForm />} />
  </Routes>
);

export default OperatorRoutes;
