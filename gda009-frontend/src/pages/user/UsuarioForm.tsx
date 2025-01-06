import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import * as yup from 'yup';
import { UserInterface } from '../../shared/interfaces/UserInterface';
import RolEnum from '../../shared/utils/RolEnum';
import EstadoEnum from '../../shared/utils/EstadoEnum';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from 'date-fns';


export const schemaUsuario = yup.object().shape({
  nombre_completo: yup.string().required('El nombre es requerido'),
  correo_electronico: yup.string().required('El Correo electronico es requerido'),
  telefono: yup.string().optional(),
  password: yup.string().required('La contraseña es requerida').min(6, 'La contraseña debe tener al menos 6 caracteres'),
  idEstado: yup.number().required('El estado es requerido'),
  idRol: yup.number().required('El rol es requerido'),
  fecha_nacimiento: yup.string().required("La fecha de nacimiento es obligatoria").matches(/^\d{4}-\d{2}-\d{2}$/, "El formato debe ser YYYY-MM-DD")
});

export const UsuarioForm: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<UserInterface>();

  return (
    <>
      <Controller
        name="nombre_completo"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            label="Nombre Completo"
            fullWidth
            error={!!errors.nombre_completo}
            helperText={errors.nombre_completo?.message}
          />
        )}
      />
      <Controller
        name="correo_electronico"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            label="Email"
            fullWidth
            error={!!errors.correo_electronico}
            helperText={errors.correo_electronico?.message}
          />
        )}
      />
      <Controller
        name="telefono"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            label="Telefono"
            fullWidth
            error={!!errors.telefono}
            helperText={errors.telefono?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            label="Contraseña"
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}
      />

      {/* DatePicker for fecha_nacimiento */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          name="fecha_nacimiento"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Fecha de Nacimiento"
              onChange={(newValue) => {
                // Format the value to yyyy-MM-dd before setting it
                const formattedDate = newValue
                  ? format(new Date(newValue), "yyyy-MM-dd")
                  : null;
                field.onChange(formattedDate);
              }}
              value={field.value ? new Date(field.value) : null}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: "dense",
                  error: !!errors.fecha_nacimiento,
                  helperText: errors.fecha_nacimiento?.message,
                },
              }}
            />
          )}
        />
      </LocalizationProvider>



      <Controller
        name="idRol"
        control={control}
        render={({ field }) => (
          <FormControl sx={{ mt: 2 }} fullWidth margin="dense" error={!!errors.idRol}>
            <InputLabel>Rol</InputLabel>
            <Select {...field} label="Rol">
              <MenuItem value={RolEnum.ADMIN}>Admin</MenuItem>
              <MenuItem value={RolEnum.OPERADOR}>Operador</MenuItem>
              <MenuItem value={RolEnum.CLIENTE}>Cliente</MenuItem>
            </Select>
            {errors.idRol && <FormHelperText>{errors.idRol.message}</FormHelperText>}
          </FormControl>
        )}
      />
      <Controller
        name="idEstado"
        control={control}
        render={({ field }) => (
          <FormControl sx={{ mt: 2 }} fullWidth margin="dense" error={!!errors.idEstado}>
            <InputLabel>Estado</InputLabel>
            <Select {...field} label="Estado">
              <MenuItem value={EstadoEnum.ACTIVO}>Activo</MenuItem>
              <MenuItem value={EstadoEnum.INACTIVO}>Inactivo</MenuItem>
            </Select>
            {errors.idEstado && <FormHelperText>{errors.idEstado.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </>
  );
}