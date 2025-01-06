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
  Typography,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaUsuario, UsuarioForm } from './UsuarioForm';
import { ClienteForm, schemaCliente } from './ClienteForm';
import { UserInterface } from '../../shared/interfaces/UserInterface';
import { deleteUser, userCreate, userList, userUpdate } from '../../services/user-service';
import { useNotification } from '../../shared/context/NotificationProvider';



const schemaUsuarioCliente = schemaUsuario.concat(schemaCliente);

const UserCRUD: React.FC = () => {
  const [usuarios, setUsuarios] = useState<UserInterface[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUsuario, setCurrentUsuario] = useState<UserInterface | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { notify } = useNotification();
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const methods = useForm<UserInterface>({
    resolver: yupResolver(schemaUsuarioCliente),
    mode: 'onChange',
    defaultValues: {
      nombre_completo: '',
      correo_electronico: '',
      telefono: '',
      password: '',
      razon_social: '',
      direccion_entrega: '',
      nombre_comercial: '',
      idRol: 1,
      idEstado: 1,
    },
  });

  const { handleSubmit, reset } = methods;


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userList();
        setUsuarios(data);
      } catch (error) {
        notify('Error obteniendo usuarios, intente mas tarde', 'error')
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  const handleOpenDialog = (usuario: UserInterface | null) => {
    setCurrentUsuario(usuario);
    reset(usuario || {
      nombre_completo: '',
      correo_electronico: '',
      telefono: '',
      password: '',
      razon_social: '',
      direccion_entrega: '',
      nombre_comercial: '',
      idRol: 1,
      idEstado: 1,
    });
    setOpenDialog(true);
    setActiveStep(0);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentUsuario(null);
    reset();
    setActiveStep(0);
  };
  const handleOpenDeleteDialog = (categoria: UserInterface | null) => {
    setCurrentUsuario(categoria);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    reset();
    setOpenDeleteDialog(false);
    setCurrentUsuario(null);
  };

  const onSubmit = async (data: UserInterface) => {
    const isValid = await methods.trigger();

    if (isValid) {
      if (currentUsuario) {
        const updatedUsuario: UserInterface = await userUpdate(data)
        setUsuarios(usuarios.map(u => u.id === currentUsuario.id ? { ...currentUsuario, ...updatedUsuario } : u));
        notify('Usuario actualizado satisfactoriamente', 'info')
      } else {
        try {
          const newUsuario: UserInterface = await userCreate(data)
          setUsuarios([...usuarios, newUsuario]);
          notify('Usuario creado satisfactoriamente', 'success')
        } catch (error) {
          notify('Ocurrio un error creando el usuario, intente mas tarde.', 'error');
        }
      }
      handleCloseDialog();
    }
  };

  const handleDeleteUsuario = async (id?: number) => {
    try {
      await deleteUser(id!)
      setUsuarios(usuarios.filter(u => u.id !== id));
      notify('Usuario eliminado satisfactoriamente.', 'warning');
    } catch {
      notify('Ocurrio un error eliminando el usuario, intente mas tarde.', 'error');
    }
    handleCloseDeleteDialog();
  };

  const handleNext = async () => {
    const fieldsToValidate = ['nombre_completo', 'correo_electronico', 'password', 'fecha_nacimiento', 'idEstado', 'idRol']

    const isValid = await methods.trigger(fieldsToValidate as any);
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const steps = ['Información del Usuario', 'Información del Cliente'];

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }} elevation={3}>
      <Typography align="center" variant="h4" component="h1" gutterBottom sx={{ mb: 4, mt: 2 }}>
        USUARIOS
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          Listado de Usuarios
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
        <Table stickyHeader aria-label="sticky table" style={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '5%' }}>ID</TableCell>
              <TableCell style={{ width: '15%' }}>Nombre</TableCell>
              <TableCell style={{ width: '15%' }}>Email</TableCell>
              <TableCell style={{ width: '15%' }}>Fecha nacimiento</TableCell>
              <TableCell style={{ width: '15%' }}>Telefono</TableCell>
              <TableCell style={{ width: '20%' }}>Razon social</TableCell>
              <TableCell style={{ width: '15%' }}>Nombre comercial</TableCell>
              <TableCell style={{ width: '15%' }}>Direccion entrega</TableCell>
              <TableCell style={{ width: '15%' }}>Estado</TableCell>
              <TableCell style={{ width: '15%' }}>Rol</TableCell>
              <TableCell style={{ width: '15%' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={usuario.id}>
                <TableCell>{usuario.id}</TableCell>
                <TableCell>{usuario.nombre_completo}</TableCell>
                <TableCell>{usuario.correo_electronico}</TableCell>
                <TableCell>{usuario.fecha_nacimiento}</TableCell>
                <TableCell>{usuario.telefono}</TableCell>
                <TableCell>{usuario.razon_social}</TableCell>
                <TableCell>{usuario.nombre_comercial}</TableCell>
                <TableCell>{usuario.direccion_entrega}</TableCell>
                <TableCell>{usuario.estado}</TableCell>
                <TableCell>{usuario.rol}</TableCell>

                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenDialog(usuario)}
                  >
                    Editar
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => handleOpenDeleteDialog(usuario)}
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
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>{currentUsuario ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</DialogTitle>
            <DialogContent>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{`${index + 1}. ${label}`}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Box sx={{ mt: 2 }}>
                {activeStep === 0 ? <UsuarioForm /> : <ClienteForm />}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancelar</Button>
              {activeStep > 0 && (
                <Button onClick={handleBack}>
                  Atrás
                </Button>
              )}
              {activeStep < steps.length - 1 ? (
                <Button onClick={(e) => {
                  e.preventDefault();
                  handleNext();
                }}>
                  Siguiente
                </Button>
              ) : (
                <Button type="submit">
                  {currentUsuario ? 'Guardar Cambios' : 'Crear'}
                </Button>
              )}
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>

      {/* Dialog de eliminación */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación - {currentUsuario?.correo_electronico}</DialogTitle>
        <DialogContent>
          <p>¿Estás seguro de que quieres eliminar el usuario <b>{currentUsuario?.correo_electronico}</b>? Esta acción no se puede deshacer.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleDeleteUsuario(currentUsuario!.id)} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default UserCRUD;