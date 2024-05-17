import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Typography, Divider, Box, TextField } from "@mui/material";

import { useGetUserQuery } from "../redux/okBaseApi";
const Profile = () => {
  //get data
  const { data, isLoading, error } = useGetUserQuery();

  const validationSchema = yup.object({
    name: yup.string("Введите ссылку").required("Введите ссылку"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createMaterial(values).unwrap();
    },
  });

  useEffect(() => {
    if (data) {
      let newInitialValues = {
        name: data.data.name,
        lastName: data.data.lastName,
        email: data.data.email,
      };
      formik.setValues(newInitialValues);
    }
  }, [data]);

  if (isLoading) return;
  if (error)
    return (
      <Typography
        color="error"
        sx={{
          width: "100%",
          textAlign: "center",
          py: { xs: 2, md: 8 },
          px: { xs: 2, md: 4 },
        }}
      >
        {error.data.message}
      </Typography>
    );
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          py: { xs: 2, md: 8 },
          px: { xs: 2, md: 4 },
        }}
      >
        Профиль
      </Typography>
      <Divider />
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: { xs: "center", sm: "flex-start" },
          width: { md: "100%", lg: "70%" },
          p: { xs: 2, md: 4 },
        }}
      >
        {isLoading ? (
          <CircularProgress></CircularProgress>
        ) : (
          data && (
            <>
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                id="name"
                name="name"
                label="Имя"
                disabled
                value={formik.values.name}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                id="name"
                name="name"
                label="Фамилия"
                disabled
                value={formik.values.lastName}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                id="email"
                name="email"
                label="Email"
                disabled
                value={formik.values.email}
              />
            </>
          )
        )}
        {error && <Typography color="error">{error.data.message}</Typography>}
        {/* <Button
        color="primary"
        variant="contained"
        type="submit"
        sx={{ width: { xs: "100%", sm: "fit-content" }, mt: 3 }}
      >
        Сохранить
      </Button> */}
      </Box>
    </>
  );
};

export default Profile;
