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
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { categoriesList, createCategory, deleteCategory, updateCategory } from '../../services/product-category';
import { useNotification } from '../../shared/context/NotificationProvider';
import { CategoriaForm, ProductCategoryInterface } from '../../shared/interfaces/ProductCategoryInterface';
import EstadoEnum from '../../shared/utils/EstadoEnum';

const schema = yup.object().shape({
  nombre: yup.string().required('El nombre es requerido').max(50, 'El nombre no puede exceder 50 caracteres'),
  idEstado: yup.number().required('El estado es requerido')
});

export default function CategoriaList() {
  const [categorias, setCategorias] = useState<ProductCategoryInterface[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentCategoria, setCurrentCategoria] = useState<ProductCategoryInterface | null>(null);
  const { notify } = useNotification();
  const [loading, setLoading] = useState(true);


  const { register, handleSubmit, setValue, reset } = useForm<CategoriaForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: '',
    },
  });

  useEffect(() => {
    if (currentCategoria) {
      setValue('nombre', currentCategoria.nombre);
    }
  }, [currentCategoria, setValue]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesList();
        setCategorias(data);
      } catch (error) {
        notify('Error obteniendo categorias, intente mas tarde', 'error')
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleOpenDialog = (categoria: ProductCategoryInterface | null) => {
    setCurrentCategoria(categoria);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    reset();
    setOpenDialog(false);
    setCurrentCategoria(null);
  };

  const handleOpenDeleteDialog = (categoria: ProductCategoryInterface | null) => {
    setCurrentCategoria(categoria);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    reset();
    setOpenDeleteDialog(false);
    setCurrentCategoria(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }


  const onSubmit = async (data: CategoriaForm) => {
    if (currentCategoria) {//Es editar
      //Llamar al endpoint de update
      const updatedCategory: ProductCategoryInterface = await updateCategory(data, currentCategoria.id);
      setCategorias(categorias.map(cat => cat.id === currentCategoria.id ? { ...currentCategoria, ...updatedCategory } : cat));
      notify('Categoria actualizada satisfactoriamente', 'info')
    } else { //Es crear
      //Llamar al endpoint de crear.
      try {
        const newCategory = await createCategory(data)
        setCategorias([...categorias, newCategory]);
        notify('Categoria creada satisfactoriamente', 'success')
      } catch (error) {
        notify('Ocurrio un error creando la categoria, intente mas tarde.', 'error');
      }
    }
    handleCloseDialog();
  };

  const handleDeleteCategoria = async (id: number) => {
    try {
      await deleteCategory(id)
      setCategorias(categorias.filter(cat => cat.id !== id));
      notify('Categoria eliminada satisfactoriamente.', 'warning');
    } catch {
      notify('Ocurrio un error eliminando la categoria, intente mas tarde.', 'error');
    }
    handleCloseDeleteDialog();
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }} elevation={3}>
      <Typography align='center' variant="h4" component="h1" gutterBottom sx={{ mb: 4, mt: 2 }}>
        CATEGORÍAS
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          Listado de Categorías
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog(null)}
        >
          Crear Nueva Categoría
        </Button>
      </Box>
      <TableContainer sx={{ maxHeight: 500, boxShadow: 3, borderRadius: 2 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow >
              <TableCell sx={{ width: '5%' }} align="center">ID</TableCell>
              <TableCell sx={{ width: '10%' }} align="center">Nombre</TableCell>
              <TableCell sx={{ width: '5%' }} align="center">Estado</TableCell>
              <TableCell sx={{ width: '10%' }} align="center">Fecha de creacion</TableCell>
              <TableCell sx={{ width: '10%' }} align="center">Fecha de modificacion</TableCell>
              <TableCell sx={{ width: '20%' }} align="center">Creador</TableCell>
              <TableCell sx={{ width: '16%' }} align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorias.map((categoria) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={categoria.id}>
                <TableCell align="center">{categoria.id}</TableCell>
                <TableCell align="center">{categoria.nombre}</TableCell>
                <TableCell align="center">{categoria.estado}</TableCell>
                <TableCell align="center">{categoria.fecha_creacion.split('T')[0]}</TableCell>
                <TableCell align="center">{categoria.fecha_modificacion.split('T')[0]}</TableCell>
                <TableCell align="center">{categoria.usuario_creador}</TableCell>
                <TableCell align="center">
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenDialog(categoria)}
                  >
                    Editar
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => handleOpenDeleteDialog(categoria)}
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

      {/* CREACION/EDICION DE CATEGORIA (MODAL) */}
      <Dialog open={openDialog} onClose={handleCloseDialog} >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{currentCategoria ? 'Editar Categoría' : 'Crear Nueva Categoría'}</DialogTitle>
          <DialogContent>
            <TextField
              {...register('nombre')}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              autoFocus
              margin="dense"
              name="nombre"
              label="Categoría"
              placeholder='Nombre de la Categoria'
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={currentCategoria?.nombre || ''}
            />
            <InputLabel sx={{ "mt": 2 }}> Estado</InputLabel>
            <Select  {...register('idEstado')} variant="outlined" label="Estado"
              defaultValue={currentCategoria?.idEstado || EstadoEnum.ACTIVO} fullWidth={true}>
              <MenuItem value={EstadoEnum.ACTIVO}>Activo</MenuItem>
              <MenuItem value={EstadoEnum.INACTIVO}>Inactivo</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit">{currentCategoria ? 'Guardar Cambios' : 'Crear'}</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Dialog de eliminación */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación - {currentCategoria?.nombre}</DialogTitle>
        <DialogContent>
          <p>¿Estás seguro de que quieres eliminar la categoría <b>{currentCategoria?.nombre}</b>? Esta acción no se puede deshacer.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleDeleteCategoria(currentCategoria!.id)} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

