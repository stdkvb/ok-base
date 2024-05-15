import { useFormik } from "formik";
import * as yup from "yup";
import {
  Typography,
  Divider,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import CustomSelect from "../components/Select";
import {
  useGetFormPropertiesQuery,
  useCreateMaterialMutation,
} from "../redux/okBaseApi";

const CreateMaterial = () => {
  //get data
  const { data, isLoading } = useGetFormPropertiesQuery();

  //query
  const [createMaterial, { error, isSuccess }] = useCreateMaterialMutation();

  //form validation
  const validationSchema = yup.object({
    name: yup.string("Введите название").required("Введите название"),
    link: yup.string("Введите ссылку").required("Введите ссылку"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      link: "",
      grade: "",
      theme: "",
      company: "",
      people: "",
      description: "",
      forEveryone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createMaterial(values).unwrap();
    },
  });

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
        {!isLoading &&
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
                <CustomSelect
                  key={i}
                  label={field.title}
                  name={field.name}
                  options={field.value}
                  required={field.required}
                  multiple={field.multiple}
                />
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
                  multiline="true"
                  minRows={2}
                />
              );
            }
            if (field.type == "checkbox") {
              return (
                <FormControlLabel control={<Checkbox />} label={field.title} />
              );
            }
          })}
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
