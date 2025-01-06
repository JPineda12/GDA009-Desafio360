import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProductList from "../products/ProductList";
import { useEffect, useState } from "react";
import { categoriesList } from "../../services/product-category";
import { useNotification } from "../../shared/context/NotificationProvider";
import { ProductCategoryInterface } from "../../shared/interfaces/ProductCategoryInterface";

const CustomerHome: React.FC = () => {
    const { notify } = useNotification();
  const [categories, setCategories] = useState<ProductCategoryInterface[]>([]);

   useEffect(() => {
      const fetchProducts = async () => {
        try {
          const data = await categoriesList();
          setCategories(data);
        } catch (error) {
          notify('Error obteniendo categorias, intente mas tarde', 'warning')
        }
      };
  
      fetchProducts();
    }, []);

  return (
    <Box sx={{ display: 'flex', flexGrow: 1, position: 'relative' }}>
      {/* Sidebar */}
      <Sidebar items={categories}></Sidebar>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: 'auto',
        }}
      >
        <ProductList />
      </Box>
    </Box>
  );
}

export default CustomerHome;
