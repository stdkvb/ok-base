import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";

const fields = [
  { label: "Email", name: "email" },
  { label: "Имя", name: "firstName" },
  { label: "Фамилия", name: "lastName" },
];

const validationSchema = yup.object({
  email: yup
    .string("Введите ваш email")
    .email("Введите корректный email")
    .required("Обязательное поле"),
  firstName: yup.string("Введите ваше имя").required("Обязательное поле"),
  lastName: yup.string("Введите вашу фамилию").required("Обязательное поле"),
});

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form noValidate onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          required
        />
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="Имя"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          required
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Фамилия"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          required
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
