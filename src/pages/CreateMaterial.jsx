import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Typography,
  Divider,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";

import {
  useGetFormPropertiesQuery,
  useCreateMaterialMutation,
} from "../redux/okBaseApi";
import { setFilter } from "../redux/slices/filterSlice";

const CreateMaterial = () => {
  const navigate = useNavigate();
  //redux states
  const dispatch = useDispatch();

  //get data
  const { data, isLoading } = useGetFormPropertiesQuery();

  //query
  const [createMaterial, { error, isSuccess, data: createdMaterial }] =
    useCreateMaterialMutation();

  //form validation
  const validationSchema = yup.object({
    link: yup.string("Введите ссылку").required("Введите ссылку"),
  });

  const formik = useFormik({
    initialValues: {
      link: "",
      name: "",
      description: "",
      category: [],
      grade: [],
      theme: [],
      company: [],
      people: [],
      event: [],
      myTags: "",
      forEveryone: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createMaterial(values).unwrap();
    },
  });

  if (isSuccess) {
    dispatch(setFilter({ name: "my", value: true }));
    navigate(`/material/${createdMaterial.id}`);
  }

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          py: { xs: 2, md: 8 },
          px: { xs: 2, md: 4 },
        }}
      >
        Добавить материал
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
          data &&
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
                />
              );
            }
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
                      field.multiple ? (selected) => selected.join(", ") : null
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
                  sx={{ mb: 4 }}
                />
              );
            }
            if (field.type == "checkbox") {
              return (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      value={formik.values[field.name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched[field.name] &&
                        Boolean(formik.errors[field.name])
                      }
                      required={field.required}
                    />
                  }
                  label={field.title}
                />
              );
            }
          })
        )}
        {error && <Typography color="error">{error.data.message}</Typography>}
        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{ width: { xs: "100%", sm: "fit-content" }, mt: 3 }}
        >
          Сохранить
        </Button>
      </Box>
    </>
  );
};

export default CreateMaterial;
