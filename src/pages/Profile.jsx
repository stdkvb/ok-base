import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Typography,
  Divider,
  Box,
  TextField,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyIcon from "@mui/icons-material/Key";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { clearToken } from "../redux/slices/authSlice";
import { resetFilters, setFilter } from "../redux/slices/filterSlice";
import {
  useGetUserQuery,
  useLogOutQuery,
  useEditUserMutation,
} from "../redux/okBaseApi";
import CreatePassword from "../components/CreatePassword";

const fields = [
  { label: "Email", name: "email", type: "input" },
  { label: "Имя", name: "name", type: "input" },
  { label: "Фамилия", name: "lastName", type: "input" },
];

const Profile = () => {
  const dispatch = useDispatch();

  //get data
  const { data, isLoading, error, refetch } = useGetUserQuery();

  const [editUser, { isSuccess: editUserSuccess }] = useEditUserMutation();

  const validationSchema = yup.object({
    name: yup.string("Введите имя").required("Введите имя"),
    lastName: yup.string("Введите имя").required("Введите имя"),
    email: yup
      .string("Введите email")
      .email("Введите корректный email")
      .required("Введите email"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      editUser(values).unwrap();
      setReadOnly(true);
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

  const [readOnly, setReadOnly] = useState(true);

  const [passwordChange, setPasswordChange] = useState(false);

  const onPasswordChangeSuccess = () => {
    setPasswordChange(false);
  };

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
        component="h1"
        sx={{
          p: { xs: 2, md: 4 },
          lineHeight: 1,
        }}
      >
        Профиль
      </Typography>
      <Divider />
      {passwordChange ? (
        <Box sx={{ p: { xs: 2, md: 4 }, pb: { xs: 2, md: 2 } }}>
          <CreatePassword
            endpoint={"change"}
            onSuccess={onPasswordChangeSuccess}
          />
        </Box>
      ) : (
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: { xs: "center", sm: "flex-start" },
            width: { xs: "100%", md: "480px" },
            p: { xs: 2, md: 4 },
            pb: { xs: 2, md: 2 },
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
                  disabled={readOnly}
                />
              );
            }
          })}
          {error && <Typography color="error">{error.data.message}</Typography>}
          {!readOnly && (
            <Button
              color="primary"
              variant="contained"
              type="submit"
              sx={{ width: { xs: "100%", md: "fit-content" } }}
            >
              Сохранить
            </Button>
          )}
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          px: { xs: 0, md: 4 },
          pt: { xs: 0, md: 0 },
          pb: { xs: 2, md: 2 },
        }}
      >
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {readOnly && (
            <Button
              variant="text"
              onClick={() => {
                setPasswordChange(false);
                setReadOnly(false);
              }}
            >
              Редактировать
            </Button>
          )}
          {!passwordChange && (
            <Button
              variant="text"
              onClick={() => {
                setReadOnly(true);
                setPasswordChange(true);
              }}
            >
              Изменить пароль
            </Button>
          )}
          <Button
            variant="text"
            component={RouterLink}
            to="/my-materials"
            onClick={() => {
              dispatch(resetFilters());
              dispatch(setFilter({ name: "my", value: true }));
            }}
          >
            Мои материалы
          </Button>
          <Button
            variant="text"
            component={RouterLink}
            to="/favorites"
            onClick={() => {
              dispatch(resetFilters());
              dispatch(setFilter({ name: "favorites", value: true }));
            }}
          >
            Избранное
          </Button>
          <Button
            variant="text"
            component={RouterLink}
            to="/"
            onClick={() => {
              dispatch(clearToken());
              dispatch(resetFilters());
            }}
          >
            Выйти
          </Button>
        </Box>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Divider />
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
          >
            {readOnly && (
              <IconButton
                sx={{ m: 1 }}
                onClick={() => {
                  setPasswordChange(false);
                  setReadOnly(false);
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
            )}
            {!passwordChange && (
              <IconButton
                sx={{ m: 1 }}
                onClick={() => {
                  setReadOnly(true);
                  setPasswordChange(true);
                }}
              >
                <KeyIcon />
              </IconButton>
            )}
            <IconButton
              sx={{ m: 1 }}
              component={RouterLink}
              to="/my-materials"
              onClick={() => {
                dispatch(resetFilters());
                dispatch(setFilter({ name: "my", value: true }));
              }}
            >
              <FolderOpenOutlinedIcon />
            </IconButton>
            <IconButton
              sx={{ m: 1 }}
              component={RouterLink}
              to="/favorites"
              onClick={() => {
                dispatch(resetFilters());
                dispatch(setFilter({ name: "favorites", value: true }));
              }}
            >
              <FavoriteBorderOutlinedIcon />
            </IconButton>
            <IconButton
              sx={{ m: 1 }}
              component={RouterLink}
              to="/"
              onClick={() => {
                dispatch(clearToken());
                dispatch(resetFilters());
              }}
            >
              <LogoutOutlinedIcon />
            </IconButton>
            <Divider />
          </Stack>
          <Divider />
        </Box>
      </Box>
      <Box sx={{ px: { xs: 2, md: 4 } }}>
        <Button
          fullWidth
          variant="contained"
          component={RouterLink}
          to="/create-material"
          sx={{
            maxWidth: { xs: "unset", md: "fit-content" },
          }}
        >
          Добавить материал
        </Button>
      </Box>
    </>
  );
};

export default Profile;
