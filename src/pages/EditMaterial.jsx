import { Typography, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetMaterialDetailQuery } from "../redux/okBaseApi";
import MaterialForm from "../components/MaterialForm";

const EditMaterial = () => {
  const filters = useSelector((state) => state.filtersSlice.filters);
  //get detail page id
  let { materialDetailId } = useParams();
  //get data
  const { data, isLoading } = useGetMaterialDetailQuery({
    materialDetailId,
    filters,
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
        Редактировать материал
      </Typography>
      <Divider />
      <MaterialForm initialValues={data} />
    </>
  );
};

export default EditMaterial;
