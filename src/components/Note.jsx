import { useEffect, useRef } from "react";
import { TextField, Divider, Box, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

import { useAddNoteMutation, useChangeNoteMutation } from "../redux/okBaseApi";
import Notification from "../components/Notification";

const Note = ({ initialValue, materialId }) => {
  const [saveNote, { error, isSuccess }] =
    initialValue.length <= 0 ? useAddNoteMutation() : useChangeNoteMutation();

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      let body = { ...values, ...{ materialId: materialId } };
      saveNote(body).unwrap();
    },
  });

  useEffect(() => {
    if (initialValue) {
      let newInitialValue = {
        text: initialValue.text,
        id: initialValue.id,
      };
      formik.setValues(newInitialValue);
    }
  }, [initialValue]);

  //notification
  const notificationRef = useRef();
  const handleOpenNotification = (message) => {
    if (notificationRef.current) {
      notificationRef.current.openNotification(message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      handleOpenNotification("Заметка сохранена");
    }
  }, [isSuccess]);

  return (
    <>
      {/* <Notification ref={notificationRef} /> */}
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "flex-start",
          width: { md: "100%", lg: "70%" },
          p: { xs: 2, md: 4 },
        }}
      >
        <TextField
          InputLabelProps={{ shrink: true }}
          multiline={true}
          minRows={4}
          fullWidth
          id="note"
          name="text"
          label="Заметка"
          value={formik.values.text}
          onChange={formik.handleChange}
          error={formik.touched.text && Boolean(formik.errors.text)}
        />
        {error && (
          <Typography color="error" variant="caption">
            {error.data.message}
          </Typography>
        )}
        <Button type="submit" variant="text">
          Сохранить
        </Button>
      </Box>
      <Divider />
    </>
  );
};

export default Note;
