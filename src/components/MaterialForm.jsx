import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Drawer,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import {
  useGetFormPropertiesQuery,
  useCreateMaterialMutation,
  useEditMaterialMutation,
} from "../redux/okBaseApi";
import { setFilter } from "../redux/slices/filterSlice";
import {
  setNewMaterial,
  resetNewMaterial,
} from "../redux/slices/newMaterialSlice";

const MaterialForm = ({ initialValues }) => {
  const navigate = useNavigate();
  //redux states
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.authSlice.loggedIn);
  const newMaterial = useSelector(
    (state) => state.newMaterialSlice.newMaterial
  );
  //get data
  const { data, isLoading } = useGetFormPropertiesQuery();

  //query
  const [createMaterial, { error, isSuccess, data: createdMaterial }] =
    initialValues ? useEditMaterialMutation() : useCreateMaterialMutation();

  //form validation
  const validationSchema = yup.object({
    link: yup.string("Введите ссылку").required("Введите ссылку"),
  });

  const formik = useFormik({
    initialValues: {
      link: "",
      name: "",
      description: "",
      category: "",
      grade: "",
      theme: [],
      company: [],
      people: [],
      event: [],
      myTags: [],
      forEveryone: false,
      note: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (loggedIn) {
        createMaterial(values).unwrap();
        dispatch(resetNewMaterial());
      } else {
        dispatch(setNewMaterial(values));
        navigate("/log-in");
      }
    },
  });

  //if material created before login -> fill up form
  useEffect(() => {
    if (newMaterial.link !== "") {
      formik.setValues(newMaterial);
    }
  }, []);

  useEffect(() => {
    if (initialValues) {
      let newInitialValues = {
        id: initialValues.id,
        link: initialValues.link,
        name: initialValues.name,
        description: initialValues.description,
        category: initialValues.category,
        grade: initialValues.grade,
        theme: initialValues.theme,
        company: initialValues.company,
        people: initialValues.people,
        event: initialValues.event,
        myTags: initialValues.myTags,
        forEveryone: initialValues.forEveryone,
        note: initialValues.note,
      };
      formik.setValues(newInitialValues);
    }
  }, [initialValues]);

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  if (isSuccess) {
    dispatch(setFilter({ name: "my", value: true }));
    dispatch(resetNewMaterial());
    navigate("/my-materials");
  }
  if (isLoading) return;

  return (
    <Box component="form" noValidate onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: { md: "100%", lg: "70%" },
          p: { xs: 2, md: 4 },
        }}
      >
        {data &&
          data.data.map((field, i) => {
            if (field.type == "input") {
              return (
                <TextField
                  key={i}
                  fullWidth
                  id={field.name}
                  name={field.name}
                  label={field.title}
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
                  required={field.required}
                  sx={
                    field.name == "myTags" && {
                      display: { xs: "none", md: "block" },
                    }
                  }
                />
              );
            }
            if (field.type == "select") {
              return (
                <FormControl
                  fullWidth
                  key={i}
                  sx={{ display: { xs: "none", sm: "flex" } }}
                >
                  <InputLabel id="select-label">{field.title}</InputLabel>
                  <Select
                    labelId="select-label"
                    id={field.name}
                    name={field.name}
                    multiple={field.multiple}
                    value={formik.values[field.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched[field.name] &&
                      Boolean(formik.errors[field.name])
                    }
                    required={field.required}
                    renderValue={
                      field.multiple
                        ? (selected) => selected.join(", ")
                        : undefined
                    }
                    input={
                      <OutlinedInput
                        label={field.title}
                        sx={{
                          [`& .MuiInputBase-input`]: {
                            whiteSpace: "break-spaces !important",
                          },
                        }}
                      />
                    }
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 48 * 4.5 + 8,
                          width: 250,
                        },
                      },
                    }}
                  >
                    {field.value.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }
            if (field.type == "textarea") {
              return (
                <TextField
                  key={i}
                  fullWidth
                  id={field.name}
                  name={field.name}
                  label={field.title}
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
                  required={field.required}
                  multiline={true}
                  minRows={2}
                  sx={{ mb: { xs: 0, sm: 4 } }}
                />
              );
            }
            if (field.type == "checkbox") {
              return (
                <FormGroup key={i}>
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
                    label={field.title}
                  />
                  {formik.touched[field.name] && formik.errors[field.name] && (
                    <Typography color="error">
                      {formik.errors[field.name]}
                    </Typography>
                  )}
                </FormGroup>
              );
            }
          })}
      </Box>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        <Divider />
        <Typography
          onClick={toggleDrawer(true)}
          variant="h6"
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "space-between",
            p: { xs: 2, md: 4 },
          }}
        >
          Добавить теги
          <IconButton sx={{ p: 0 }}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Typography>
        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
          anchor="right"
          sx={{
            display: { xs: "flex", sm: "none" },
            "& .MuiDrawer-paper": {
              position: "unset",
              boxSizing: "border-box",
              border: "none",
            },
          }}
        >
          <Typography
            variant="h6"
            onClick={toggleDrawer(false)}
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              p: 2,
            }}
          >
            <IconButton sx={{ p: 0 }}>
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            Назад
          </Typography>
          <Divider />
          <Stack direction="column" sx={{ p: 2, gap: 2 }}>
            {data &&
              data.data.map((field, i) => {
                if (field.type == "select") {
                  return (
                    <FormControl fullWidth key={i}>
                      <InputLabel id="select-label">{field.title}</InputLabel>
                      <Select
                        labelId="select-label"
                        id={field.name}
                        name={field.name}
                        multiple={field.multiple}
                        value={formik.values[field.name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched[field.name] &&
                          Boolean(formik.errors[field.name])
                        }
                        required={field.required}
                        renderValue={
                          field.multiple
                            ? (selected) => selected.join(", ")
                            : undefined
                        }
                        input={
                          <OutlinedInput
                            label={field.title}
                            sx={{
                              [`& .MuiInputBase-input`]: {
                                whiteSpace: "break-spaces !important",
                              },
                            }}
                          />
                        }
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 48 * 4.5 + 8,
                              width: 250,
                            },
                          },
                        }}
                      >
                        {field.value.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  );
                }
                if (field.name == "myTags") {
                  return (
                    <TextField
                      key={i}
                      fullWidth
                      id={field.name}
                      name={field.name}
                      label={field.title}
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
                      required={field.required}
                    />
                  );
                }
              })}
          </Stack>
        </Drawer>
        <Divider />
      </Box>
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          pb: { xs: 2, md: 4 },
          pt: { xs: 2, md: 0 },
        }}
      >
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
    </Box>
  );
};

export default MaterialForm;
