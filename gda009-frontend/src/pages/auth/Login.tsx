import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Box, Typography, Card, CardContent } from '@mui/material';
import React from 'react';
import authService from '../../services/auth-service';
import { useNotification } from '../../context/NotificationProvider';
import { jwtDecode } from 'jwt-decode';
import RolEnum from '../../utils/RolEnum';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface LoginFormValues {
  correo_electronico: string;
  password: string;
}

const schema = yup.object().shape({
  correo_electronico: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup.string().min(5, 'Debe tener al menos 5 caracteres').required('La contraseña es obligatoria'),
});

const Login: React.FC = () => {
  const { notify } = useNotification();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });
  const { login } = useAuth();
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const response = await authService.login(data.correo_electronico, data.password);
      console.log('Login successful:', response);

      login(response.token)
    } catch (error: any) {
      if (error.statusCode === 401) {
        notify(error.message || 'Unauthorized', 'error');
      } else {
        notify(error.message || 'An error occurred', 'error');
      }
    }
  };

  return (
    <Card elevation={24} square={false} raised={true} sx={{ display: 'flex' }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ maxWidth: 400, m: 'auto' }}
      >
        <CardContent>
          <Typography variant="h4" align='center' color="textPrimary" gutterBottom>
            Iniciar Sesión
          </Typography>


          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register('correo_electronico')}
            error={!!errors.correo_electronico}
            helperText={errors.correo_electronico?.message}
          />

          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Iniciar sesión
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
};

export default Login;
