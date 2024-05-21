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
import Note from "../components/Note";

import {
  useGetMaterialDetailQuery,
  useDeleteMaterialMutation,
  useAddFavoritesMutation,
  useRemoveFavoritesMutation,
  useLinkClickMutation,
} from "../redux/okBaseApi";

const MaterialDetail = () => {
  const navigate = useNavigate();
  const filters = useSelector((state) => state.filtersSlice.filters);
  const loggedIn = useSelector((state) => state.authSlice.loggedIn);

  //get detail page id
  let { materialDetailId } = useParams();

  //get data
  const { data, isLoading } = useGetMaterialDetailQuery({
    materialDetailId,
    filters,
  });

  //delete material
  const [
    deleteMaterial,
    { isSuccess: successDeleteMaterial, error: errorDeleteMaterial },
  ] = useDeleteMaterialMutation();
  const handleDeleteMaterial = () => {
    deleteMaterial({ id: materialDetailId });
  };
  //redirect after delete
  if (successDeleteMaterial) {
    navigate("/my-materials");
  }

  //add to favorites
  const [
    addFavorites,
    { isSuccess: successAddFavorites, error: errorAddFavorites },
  ] = useAddFavoritesMutation();
  const [
    removeFavorites,
    { isSuccess: successRemoveFavorites, error: errorRemoveFavorites },
  ] = useRemoveFavoritesMutation();

  const toggleFavorites = (isFavorite) => {
    isFavorite
      ? removeFavorites({ id: materialDetailId })
      : addFavorites({ id: materialDetailId });
  };

  //link click listener
  const [linkClick] = useLinkClickMutation();

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
              onClick={() => linkClick({ id: materialDetailId })}
            >
              {data.linkText == "" ? "Перейти по ссылке" : data.linkText}
            </Button>
            {loggedIn && (
              <Button
                type="text"
                onClick={() => {
                  toggleFavorites(data.favorites);
                }}
              >
                {data.favorites
                  ? "Удалить из избранного"
                  : "Добавить в избранное"}
              </Button>
            )}
            {filters.my && (
              <>
                <Button
                  type="text"
                  component={RouterLink}
                  to={`/edit-material/${materialDetailId}`}
                >
                  Редактировать
                </Button>
                <Button type="text" onClick={handleDeleteMaterial}>
                  Удалить
                </Button>
              </>
            )}
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
        {loggedIn && (filters.my || filters.favorites) && (
          <Note initialValue={data.note} materialId={materialDetailId} />
        )}

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
