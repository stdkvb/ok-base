import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  TextField,
  Box,
  Typography,
  Link,
  Container,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useLogInMutation } from "../redux/okBaseApi";
import { setToken } from "../redux/slices/authSlice";

const fields = [
  { label: "Логин", name: "login" },
  { label: "Пароль", name: "password", type: "password" },
];

const LogIn = () => {
  //redux states
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [logIn, { error, isSuccess, data }] = useLogInMutation();

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
      logIn(values).unwrap();
    },
  });

  if (isSuccess) {
    dispatch(setToken(data.token));
    navigate("/");
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%",
        gap: 2,
        alignItems: "center",
        my: "auto",
        mx: 0,
      }}
    >
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
          width: { xs: "100%", md: "460px" },
        }}
      >
        {fields.map((field, i) => (
          <TextField
            key={i}
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
            type={field.type ?? "text"}
          />
        ))}
        <Link
          component={RouterLink}
          to="/recovery-pass"
          color="primary.main"
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          Забыли пароль?
        </Link>
        {error && <Typography color="error">{error.data.message}</Typography>}
        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{ width: { xs: "100%", sm: "fit-content" }, mt: 3 }}
        >
          Войти
        </Button>
      </Box>
    </Container>
  );
};

export default LogIn;
