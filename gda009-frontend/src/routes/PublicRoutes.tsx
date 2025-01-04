import { Routes, Route } from 'react-router-dom';
import ProductList from '../pages/products/ProductList';

const PublicRoutes: React.FC = () => (
  <Routes>
    <Route path="/products" element={<ProductList />} />
  </Routes>
);

export default PublicRoutes;
