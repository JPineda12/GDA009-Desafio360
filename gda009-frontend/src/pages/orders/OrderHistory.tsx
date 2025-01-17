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
  CircularProgress,
} from '@mui/material';
import { useNotification } from '../../shared/context/NotificationProvider';
import { UserOrderInterface } from '../../shared/interfaces/OrderInterface';
import { orderDetail, ordersByUserId } from '../../services/order-service';
import { OrderDetailInterface } from '../../shared/interfaces/OrderDetailInterface';
import EstadoEnum from '../../shared/utils/EstadoEnum';
import { useAuth } from '../../shared/context/AuthContext';

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<UserOrderInterface[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentOrderDetails, setCurrentOrderDetails] = useState<OrderDetailInterface[]>([]);
  const [currentOrder, setCurrentOrder] = useState<UserOrderInterface | null>(null);
  const { notify } = useNotification();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await ordersByUserId(user?.id!);
        setOrders(response)
      } catch (error) {
        notify('Error obteniendo órdenes, intente más tarde', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOpenDialog = async (order: UserOrderInterface) => {
    setCurrentOrder(order);
    try {
      const response = await orderDetail(order.id);
      setCurrentOrderDetails(response);
      setOpenDialog(true);
    } catch (error) {
      notify('Error obteniendo detalles de la orden, intente más tarde', 'error');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentOrderDetails([]);
    setCurrentOrder(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }} elevation={3}>
      <Typography align='center' variant="h4" component="h1" gutterBottom sx={{ mb: 4, mt: 2 }}>
        Historial de Órdenes
      </Typography>
      <TableContainer sx={{ maxHeight: 500, boxShadow: 3, borderRadius: 2 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Nombre Completo</TableCell>
              <TableCell align="center">Dirección</TableCell>
              <TableCell align="center">Teléfono</TableCell>
              <TableCell align="center">Correo Electrónico</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={order.id}>
                <TableCell align="center">{order.id}</TableCell>
                <TableCell align="center">{order.nombre_completo}</TableCell>
                <TableCell align="center">{order.direccion}</TableCell>
                <TableCell align="center">{order.telefono}</TableCell>
                <TableCell align="center">{order.correo_orden}</TableCell>
                <TableCell align="center">${order.total_orden.toFixed(2)}</TableCell>
                <TableCell align="center">{order.estado}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => handleOpenDialog(order)}
                  >
                    Ver Detalles
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Detalles de la Orden #{currentOrder?.id}</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Información de la Orden
          </Typography>
          <Typography>Nombre: {currentOrder?.nombre_completo}</Typography>
          <Typography>Dirección: {currentOrder?.direccion}</Typography>
          <Typography>Teléfono: {currentOrder?.telefono}</Typography>
          <Typography>Correo: {currentOrder?.correo_orden}</Typography>
          <Typography>Total: ${currentOrder?.total_orden.toFixed(2)}</Typography>
          <Typography>Estado: {currentOrder?.estado}</Typography>
          <Typography>Fecha de Creación: {new Date(currentOrder?.fecha_creacion ?? '').toLocaleString()}</Typography>
          {currentOrder?.idEstado === EstadoEnum.ENTREGADA && (
            <Typography>Fecha de Entrega: {new Date(currentOrder?.fecha_entrega ?? '').toLocaleString()}</Typography>
          )}
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Productos Ordenados
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>Código</TableCell>
                  <TableCell>Marca</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentOrderDetails.map((detail) => (
                  <TableRow key={detail.id}>
                    <TableCell>{detail.producto}</TableCell>
                    <TableCell>{detail.codigo}</TableCell>
                    <TableCell>{detail.marca}</TableCell>
                    <TableCell>{detail.cantidad}</TableCell>
                    <TableCell>${detail.precio.toFixed(2)}</TableCell>
                    <TableCell>${detail.subtotal.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default OrderHistory;