import { useEffect, useState } from 'react';
import { productList, ProductInterface } from '../../services/product-service';
import { useNotification } from '../../shared/context/NotificationProvider';
import { Box, CircularProgress } from '@mui/material';
import ProductCard from '../../components/ProductCard/ProductCard';

const ProductList: React.FC = () => {
  const { notify } = useNotification();
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productList();
        setProducts(data);
      } catch (error) {
        notify('Error obteniendo productos, intente mas tarde', 'error')
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }


  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 3,
        padding: 3,
      }}
    >
      {products.map((producto: ProductInterface) => (
        <ProductCard product={producto}></ProductCard>
      ))}
    </Box>
  );
};

export default ProductList;
