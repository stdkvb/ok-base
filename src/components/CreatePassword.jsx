import { Button, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/authSlice";
import {
  useRegFinishMutation,
  useRecoveryPassFinishMutation,
  useChangePasswordMutation,
} from "../redux/okBaseApi";

const fields = [
  { label: "Пароль", name: "password" },
  { label: "Повторите пароль", name: "confirmPassword" },
];

const changePasswordFields = [
  { label: "Текущий пароль", name: "oldPassword" },
  { label: "Новый пароль", name: "password" },
  { label: "Повторите пароль", name: "confirmPassword" },
];

const CreatePassword = ({ urlParams, endpoint, onSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let createPasswordHook;
  if (endpoint === "reg") {
    createPasswordHook = useRegFinishMutation();
  } else if (endpoint === "recovery") {
    createPasswordHook = useRecoveryPassFinishMutation();
  } else if (endpoint === "change") {
    createPasswordHook = useChangePasswordMutation();
  } else {
    throw new Error("Invalid endpoint");
  }
  const [createPassword, { error, isSuccess, data }] = createPasswordHook;

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
      createPassword({ ...values, ...urlParams }).unwrap();
    },
  });

  if (isSuccess) {
    dispatch(setToken(data.token));
    if (endpoint == "change") {
      onSuccess();
    } else {
      navigate("/profile");
    }
  }

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: { xs: "center", sm: "flex-start" },
          width: { xs: "100%", md: "416px" },
        }}
      >
        {(endpoint == "change" ? changePasswordFields : fields).map(
          (field, i) => (
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
              helperText={
                formik.touched[field.name] && formik.errors[field.name]
              }
              required
              type="password"
            />
          )
        )}
        {error && <Typography color="error">{error.data.message}</Typography>}
        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{ width: { xs: "100%", sm: "fit-content" } }}
        >
          Сохранить
        </Button>
      </Box>
    </>
  );
};

export default CreatePassword;
