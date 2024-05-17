import { Typography, Divider } from "@mui/material";
import MaterialForm from "../components/MaterialForm";

const CreateMaterial = () => {
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
      <MaterialForm />
    </>
  );
};

export default CreateMaterial;
