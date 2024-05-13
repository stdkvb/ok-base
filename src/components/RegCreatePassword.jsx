import { Button, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useRegFinishMutation } from "../redux/okBaseApi";
import { Password } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";

const fields = [
  { label: "Пароль", name: "password" },
  { label: "Повторите пароль", name: "confirmPassword" },
];

const RegCreatePassword = ({ urlParams }) => {
  //navigate
  const navigate = useNavigate();
  //query
  const [finishReg, { error, isSuccess }] = useRegFinishMutation();

  const validationSchema = yup.object({
    password: yup
      .string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .required("Введите пароль"),
    confirmPassword: yup
      .string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .oneOf([yup.ref("password"), null], "Пароли не совпадают")
      .required("Введите пароль"),
  });

  //form validation
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      finishReg({ ...values, ...urlParams }).unwrap();
    },
  });

  if (isSuccess) {
    navigate("/log-in");
  }

  return (
    <>
      <Typography variant="h2" component="h1">
        Регистрация
      </Typography>
      <Typography>Задайте пароль для вашего аккаунта</Typography>
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
              formik.touched[field.name] && Boolean(formik.errors[field.name])
            }
            helperText={formik.touched[field.name] && formik.errors[field.name]}
            required
            type="password"
          />
        ))}
        {error && <Typography color="error">{error.data.message}</Typography>}
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
  );
};

export default RegCreatePassword;
