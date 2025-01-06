import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import * as yup from 'yup';
import { UserInterface } from "../../shared/interfaces/UserInterface";

export const schemaCliente = yup.object().shape({
  razon_social: yup.string().optional(),
  nombre_comercial: yup.string().optional(),
  direccion_entrega: yup.string().optional()
});


export const ClienteForm: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<UserInterface>();

  return (
    <>
      <Controller
        name="razon_social"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            label="Razón Social"
            fullWidth
            error={!!errors.razon_social}
            helperText={errors.razon_social?.message}
          />
        )}
      />
      <Controller
        name="nombre_comercial"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            label="Nombre comercial"
            fullWidth
            error={!!errors.nombre_comercial}
            helperText={errors.nombre_comercial?.message}
          />
        )}
      />
      <Controller
        name="direccion_entrega"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            label="Dirección de Entrega"
            fullWidth
            error={!!errors.direccion_entrega}
            helperText={errors.direccion_entrega?.message}
          />
        )}
      />
    </>
  );
}
