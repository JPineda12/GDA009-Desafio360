import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useNotification } from '../../shared/context/NotificationProvider';
import { productCreate, productDelete, productList, productUpdate } from '../../services/product-service';
import { ProductInterface } from '../../shared/interfaces/ProductInterface';

const schema = yup.object().shape({
  nombre: yup.string().required('El nombre es requerido').max(50, 'El nombre no puede exceder 50 caracteres'),
  marca: yup.string().required('La marca es requerida').max(50, 'La marca no puede exceder 50 caracteres'),
  codigo: yup.string().required('El codigo es requerido').max(50, 'El codigo no puede exceder 50 caracteres'),
  stock: yup.number().required('El stock es requerido'),
  precio: yup.number().required('El precio es requerido'),
  imagen_url: yup.string().required('La imagen es requerida'),
  idCategoria: yup.number().required('La categoria es requerido'),
  idEstado: yup.number().required('El estado es requerido')
});

const ProductCRUD: React.FC = () => {
  const [productos, setProductos] = useState<ProductInterface[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentProducto, setCurrentProducto] = useState<ProductInterface | null>(null);
  const { notify } = useNotification();
  const [loading, setLoading] = useState(true);


  const methods = useForm<ProductInterface>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      nombre: '',
      marca: '',
      stock: 0,
      precio: 0,
      imagen_url: '',
      idCategoria: 1,
      idEstado: 1
    },
  });
  const { handleSubmit, reset, control, formState: { errors } } = methods;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productList();
        setProductos(data);
      } catch (error) {
        notify('Error obteniendo productos, intente mas tarde', 'error')
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);



  const handleOpenDialog = (producto: ProductInterface | null) => {
    setCurrentProducto(producto);
    reset(producto || {
      nombre: '',
      marca: '',
      stock: 0,
      precio: 0,
      imagen_url: '',
      idCategoria: 1,
      idEstado: 1
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    reset();
    setOpenDialog(false);

    setCurrentProducto(null);
  };

  const handleOpenDeleteDialog = (producto: ProductInterface | null) => {
    setCurrentProducto(producto);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    reset();
    setOpenDeleteDialog(false);
    setCurrentProducto(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }


  const onSubmit = async (data: ProductInterface) => {
    if (currentProducto) {//Es editar
      //Llamar al endpoint de update
      const updatedProduct: ProductInterface = await productUpdate(data, currentProducto.id!);
      setProductos(productos.map(p => p.id === currentProducto.id ? { ...currentProducto, ...updatedProduct } : p));
      notify('Producto actualizado satisfactoriamente', 'info')
    } else { //Es crear
      //Llamar al endpoint de crear.
      try {
        const newProduct = await productCreate(data)
        setProductos([...productos, newProduct]);
        notify('Producto creado satisfactoriamente', 'success')
      } catch (error: any) {
        notify(error.message, 'error');
      }
    }
    handleCloseDialog();
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await productDelete(id)
      setProductos(productos.filter(p => p.id !== id));
      notify('Producto eliminado satisfactoriamente.', 'warning');
    } catch {
      notify('Ocurrio un error eliminando el producto, intente mas tarde.', 'error');
    }
    handleCloseDeleteDialog();
  };

  return (
    <FormProvider {...methods}>
      <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }} elevation={3}>
        <Typography align='center' variant="h4" component="h1" gutterBottom sx={{ mb: 4, mt: 2 }}>
          Productos
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Listado de Productos
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog(null)}
          >
            Crear
          </Button>
        </Box>
        <TableContainer sx={{ maxHeight: 500, boxShadow: 3, borderRadius: 2 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow >
                <TableCell sx={{ width: '5%' }} align="center">ID</TableCell>
                <TableCell sx={{ width: '10%' }} align="center">Nombre</TableCell>
                <TableCell sx={{ width: '10%' }} align="center">Marca</TableCell>
                <TableCell sx={{ width: '10%' }} align="center">Codigo</TableCell>
                <TableCell sx={{ width: '10%' }} align="center">Stock</TableCell>
                <TableCell sx={{ width: '10%' }} align="center">Precio</TableCell>
                <TableCell sx={{ width: '10%' }} align="center">Imagen</TableCell>
                <TableCell sx={{ width: '10%' }} align="center">Categoria</TableCell>
                <TableCell sx={{ width: '10%' }} align="center">Estado</TableCell>
                <TableCell sx={{ width: '16%' }} align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((producto) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={producto.id}>
                  <TableCell align="center">{producto.id}</TableCell>
                  <TableCell align="center">{producto.nombre}</TableCell>
                  <TableCell align="center">{producto.marca}</TableCell>
                  <TableCell align="center">{producto.codigo}</TableCell>
                  <TableCell align="center">{producto.stock}</TableCell>
                  <TableCell align="center">{producto.precio}</TableCell>
                  <TableCell align="center">{producto.nombre}</TableCell>
                  <TableCell align="center">{producto.categoria}</TableCell>
                  <TableCell align="center">{producto.estado!}</TableCell>
                  <TableCell align="center">
                    <Button
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenDialog(producto)}
                    >
                      Editar
                    </Button>
                    <Button
                      startIcon={<DeleteIcon />}
                      onClick={() => handleOpenDeleteDialog(producto)}
                      color="error"
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* CREACION/EDICION DE PRODUCTO (MODAL) */}
        <Dialog open={openDialog} onClose={handleCloseDialog} >
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>{currentProducto ? 'Editar Producto' : 'Crear Nuevo Producto'}</DialogTitle>
            <DialogContent>
              <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="dense"
                    label="Nombre"
                    fullWidth
                    error={!!errors.nombre}
                    helperText={errors.nombre?.message}
                  />
                )}
              />
              <Controller
                name="marca"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="dense"
                    label="Marca"
                    fullWidth
                    error={!!errors.marca}
                    helperText={errors.marca?.message}
                  />
                )}
              />
              <Controller
                name="codigo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="dense"
                    label="Codigo"
                    fullWidth
                    error={!!errors.marca}
                    helperText={errors.marca?.message}
                  />
                )}
              />

              <Controller
                name="stock"
                control={control}
                rules={{
                  required: "El stock es requerido",
                  validate: (value) =>
                    !isNaN(value) && Number(value) >= 0 || "Porfavor ingresa un numero valido",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Stock"
                    fullWidth
                    margin="dense"
                    error={!!errors.stock}
                    helperText={errors.stock?.message}
                  />
                )}
              />

              <Controller
                name="precio"
                control={control}
                rules={{
                  required: "El precio es requerido",
                  validate: (value) =>
                    !isNaN(value) && Number(value) >= 0 || "Porfavor ingresa un numero valido",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Precio"
                    fullWidth
                    margin="dense"
                    error={!!errors.precio}
                    helperText={errors.precio?.message}
                  />
                )}
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancelar</Button>
              <Button type="submit">{currentProducto ? 'Guardar Cambios' : 'Crear'}</Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Dialog de eliminación */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirmar Eliminación - {currentProducto?.nombre}</DialogTitle>
          <DialogContent>
            <p>¿Estás seguro de que quieres eliminar el producto <b>{currentProducto?.nombre}</b>? Esta acción no se puede deshacer.</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => handleDeleteProduct(currentProducto?.id!)} color="error">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </FormProvider>

  );
}

export default ProductCRUD;