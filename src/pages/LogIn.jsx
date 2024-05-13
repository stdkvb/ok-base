import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField, Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { useRegStartMutation } from "../redux/okBaseApi";

const fields = [
  { label: "Логин", name: "login" },
  { label: "Пароль", name: "password" },
];

const LogIn = () => {
  const [startReg, { isError }] = useRegStartMutation();

  const validationSchema = yup.object({
    login: yup.string("Введите логин").required("Введите логин"),
    password: yup.string("Введите пароль").required("Введите пароль"),
  });

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      startReg(values).unwrap();
    },
  });

  return (
    <>
      <Typography variant="h2">Авторизация</Typography>
      <Typography
        color="text.secondary"
        sx={{ mb: 3, textAlign: { xs: "center", md: "left" } }}
      >
        Новый пользователь?{" "}
        <Link component={RouterLink} to="/sign-up" color="primary.main">
          Создать аккаунт
        </Link>
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: { xs: "center", sm: "flex-start" },
          width: { xs: "100%", sm: "450px" },
        }}
      >
        {fields.map((field, i) => (
          <TextField
            fullWidth
            id={field.name}
            name={field.name}
            label={field.label}
            value={formik.values[field.name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched[field.name] && Boolean(formik.errors[field.name])
            }
            helperText={formik.touched[field.name] && formik.errors[field.name]}
            required
          />
        ))}
        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{ width: { xs: "100%", sm: "fit-content" }, mt: 3 }}
        >
          Войти
        </Button>
      </Box>
    </>
  );
};

export default LogIn;
