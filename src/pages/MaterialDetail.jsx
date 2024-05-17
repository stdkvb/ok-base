import {
  Typography,
  Divider,
  Stack,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Link,
} from "@mui/material";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import { useParams } from "react-router-dom";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Tags from "../components/Tags";

import {
  useGetMaterialDetailQuery,
  useDeleteMaterialMutation,
} from "../redux/okBaseApi";

const MaterialDetail = () => {
  const navigate = useNavigate();
  const filters = useSelector((state) => state.filtersSlice.filters);

  //get detail page id
  let { materialDetailId } = useParams();

  //get data
  const { data, isLoading } = useGetMaterialDetailQuery({
    materialDetailId,
    filters,
  });

  //delete material
  const [deleteMaterial, { error, isSuccess }] = useDeleteMaterialMutation();
  const handleDeleteMaterial = () => {
    deleteMaterial({ id: materialDetailId });
  };

  //redirect after delete
  if (isSuccess) {
    navigate("/my-materials");
  }

  if (isLoading) return;
  if (data)
    return (
      <>
        <Typography
          variant="h3"
          sx={{
            py: { xs: 2, md: 8 },
            px: { xs: 2, md: 4 },
          }}
        >
          {data.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            p: { xs: 2, md: 4 },
            flexDirection: { xs: "column-reverse", md: "row" },
            gap: 1,
          }}
        >
          <Stack
            sx={{
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 0, md: 2 },
              width: { xs: "100%", sm: "fit-content" },
            }}
          >
            <Button
              variant="contained"
              component="a"
              href={data.link}
              target="_blank"
              color="primary"
            >
              {data.linkText == "" ? "Перейти по ссылке" : data.linkText}
            </Button>
            <Button type="text">Редактировать</Button>
            <Button type="text" onClick={handleDeleteMaterial}>
              Удалить
            </Button>
          </Stack>
          <Typography color="text.secondary" ml="auto">
            {data.date}
          </Typography>
        </Box>
        <Divider />
        <Stack
          direction={{ xs: "column", md: "row" }}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={0}
        >
          <Typography sx={{ p: { xs: 2, md: 4 }, width: "100%" }}>
            {data.description}
          </Typography>
          <Tags data={data} />
        </Stack>
        <Divider />
        {!filters.my && (
          <List disablePadding sx={{ pb: 2 }}>
            <ListItem sx={{ p: { xs: 2, md: 4 }, pt: { xs: 1.5, md: 4 } }}>
              <Typography variant="h3">Другие материалы:</Typography>
            </ListItem>
            {data.recommendation.length == 0 ? (
              <ListItem sx={{ p: { xs: 2, md: 4 } }}>
                <ListItemText primary={"Ничего не найдено :("}></ListItemText>
              </ListItem>
            ) : (
              data.recommendation.map((item, i) => (
                <div key={i}>
                  <ListItem
                    item
                    sx={{
                      p: { xs: 2, md: 4 },
                      gap: 2,
                      justifyContent: "space-between",
                    }}
                  >
                    <Link component={RouterLink} to={`/material/${item.id}`}>
                      <Typography variant="h5">{item.name}</Typography>
                    </Link>
                    <ListItemIcon sx={{ minWidth: "unset" }}>
                      <ArrowOutwardOutlinedIcon />
                    </ListItemIcon>
                  </ListItem>
                  <Divider />
                </div>
              ))
            )}
          </List>
        )}
      </>
    );
};

export default MaterialDetail;
