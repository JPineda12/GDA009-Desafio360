import { Box, Typography } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { categoriesList, ProductCategory } from "../../services/product-category";
import { useNotification } from "../../shared/context/NotificationProvider";

const OperatorHome: React.FC = () => {
    const { notify } = useNotification();
  const [categories, setCategories] = useState<ProductCategory[]>([]);

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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: 'auto',
        }}
      >
        <Typography variant="h4">Welcome to Operator Home</Typography>
      </Box>
    </Box>
  );
}

export default OperatorHome;
