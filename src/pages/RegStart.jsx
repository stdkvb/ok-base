import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  TextField,
  Box,
  Typography,
  Link,
  Container,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { useRegStartMutation } from "../redux/okBaseApi";
import RegConfirmCode from "../components/RegConfirmCode";

const fields = [
  { label: "Email", name: "email", type: "input" },
  { label: "Имя", name: "firstName", type: "input" },
  { label: "Фамилия", name: "lastName", type: "input" },
  {
    label: "Я соглашаюсь с политикой конфиденциальности",
    name: "policy",
    type: "checbox",
  },
];

const RegStart = () => {
  //query
  const [startReg, { error, isSuccess, data }] = useRegStartMutation();

  const validationSchema = yup.object({
    email: yup
      .string("Введите email")
      .email("Введите корректный email")
      .required("Введите email"),
    firstName: yup.string("Введите имя").required("Введите имя"),
    lastName: yup.string("Введите фамилию").required("Введите фамилию"),
    policy: yup.boolean().oneOf([true], "Согласие обязательно"),
  });

  //form validation
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      policy: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      startReg(values).unwrap();
    },
  });

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
      <Typography variant="h2" component="h1">
        Регистрация
      </Typography>
      {isSuccess ? (
        <>
          <RegConfirmCode userId={data} />
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
              width: { xs: "100%", md: "450px" },
            }}
          >
            {fields.map((field, i) => {
              if (field.type == "input") {
                return (
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
                );
              }
              if (field.type == "checbox") {
                return (
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id={field.name}
                          name={field.name}
                          checked={formik.values[field.name]}
                          onChange={formik.handleChange}
                          required={field.required}
                        />
                      }
                      label={field.label}
                    />
                    {formik.touched[field.name] &&
                      formik.errors[field.name] && (
                        <Typography color="error">
                          {formik.errors[field.name]}
                        </Typography>
                      )}
                  </FormGroup>
                );
              }
            })}
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
    </Container>
  );
};

export default RegStart;
