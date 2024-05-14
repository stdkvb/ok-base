import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField, Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { useRecoveryPassStartMutation } from "../redux/okBaseApi";
import RecoveryPassConfirmCode from "../components/RecoveryPassConfirmCode";
import { useState } from "react";

const fields = [{ label: "Email", name: "email" }];

const RecoveryPassStart = () => {
  const [recoveryPassStart, { error, isSuccess }] =
    useRecoveryPassStartMutation();

  const [email, setEmail] = useState({});

  const validationSchema = yup.object({
    email: yup
      .string("Введите email")
      .email("Введите корректный email")
      .required("Введите email"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setEmail(values);
      recoveryPassStart(values).unwrap();
    },
  });

  return (
    <>
      <Typography variant="h2">Забыли пароль</Typography>
      {isSuccess ? (
        <RecoveryPassConfirmCode email={email} />
      ) : (
        <>
          <Typography
            color="text.secondary"
            sx={{ mb: 3, textAlign: { xs: "center", md: "left" } }}
          >
            Мы отправим код подтверждения вам на почту
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
                type={field.type ?? "text"}
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
              Отправить
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default RecoveryPassStart;
