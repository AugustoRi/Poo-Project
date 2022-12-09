import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

import api from '../../../providers/services/api';

const InputField = ({ formik, name, label, type = "text", ...other }) => (
  <TextField
    fullWidth
    type={type}
    label={label}
    value={formik.values[name]}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={formik.touched[name] && formik.errors[name]}
    margin="normal"
    variant="outlined"
    {...other}
  />
);

// ----------------------------------------------------------------------

export default function LoginForm() {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      username: yup.string().max(255).required('Usuário é obrigatório'),
      password: yup.string().max(255).required('Senha é obrigatória')
    }),
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        await api.post('/login/', values);
        setStatus({ success: true });
        setSubmitting(false);
        navigate('/dashboard/app', { replace: true });
      } catch (err) {
        console.error(err);
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
    }
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    navigate('/user/register', { replace: true });
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <InputField
          formik={formik}
          id="username"
          name="username"
          label="Usuário"
        />

        <InputField
          formik={formik}
          id="password"
          name="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="button" onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="column" alignItems="flex-end" justifyContent="flex-end" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover" gutterBottom sx={{ cursor: "pointer" }} >
          Esqueceu sua senha?
        </Link>
        <Link variant="subtitle2" underline="hover" sx={{cursor: "pointer"}} onClick={handleRegister}>
          Não tem cadastro? Faça seu cadastro agora!
        </Link>
      </Stack>

      <Button fullWidth size="large" type="submit" variant="contained">
        Entrar
      </Button>
    </form>
  );
}
