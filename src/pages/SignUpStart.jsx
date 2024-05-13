import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField, Box, Typography, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { useRegStartMutation } from "../redux/okBaseApi";
import SignUpRepeat from "../components/SignUpRepeat";

const fields = [
  { label: "Email", name: "email" },
  { label: "Имя", name: "firstName" },
  { label: "Фамилия", name: "lastName" },
];

const SignUpStart = () => {
  //query
  const [startReg, { error, isSuccess, data }] = useRegStartMutation();

  const validationSchema = yup.object({
    email: yup
      .string("Введите email")
      .email("Введите корректный email")
      .required("Введите email"),
    firstName: yup.string("Введите имя").required("Введите имя"),
    lastName: yup.string("Введите фамилию").required("Введите фамилию"),
  });

  //form validation
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      startReg(values).unwrap();
    },
  });

  return (
    <>
      <Typography variant="h2" component="h1">
        Регистрация
      </Typography>
      {isSuccess ? (
        <>
          <SignUpRepeat data={data} />
        </>
      ) : (
        <>
          <Typography
            color="text.secondary"
            sx={{ mb: 3, textAlign: { xs: "center", md: "left" } }}
          >
            Уже есть аккаунт?{" "}
            <Link component={RouterLink} to="/log-in" color="primary.main">
              Войти
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
                key={i}
                fullWidth
                id={field.name}
                name={field.name}
                label={field.label}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched[field.name] &&
                  Boolean(formik.errors[field.name])
                }
                helperText={
                  formik.touched[field.name] && formik.errors[field.name]
                }
                required
              />
            ))}
            {error && (
              <Typography color="error">{error.data.message}</Typography>
            )}
            <Button
              color="primary"
              variant="contained"
              type="submit"
              sx={{ width: { xs: "100%", sm: "fit-content" }, mt: 3 }}
            >
              Зарегистрироваться
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default SignUpStart;
