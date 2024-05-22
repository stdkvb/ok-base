import { useState } from "react";
import {
  Typography,
  Divider,
  Stack,
  Box,
  Button,
  ListItemIcon,
  Link,
  Chip,
  IconButton,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { useParams } from "react-router-dom";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import CloseIcon from "@mui/icons-material/Close";

import metaImage from "../assets/images/ok-base.jpg";
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

  //copy url to clipboard
  const copyUrlToClipboard = () => {
    const url = window.location.href; // Получаем текущий URL
    navigator.clipboard.writeText(url);
  };

  //snackbar for auth
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  if (isLoading) return;
  if (data)
    return (
      <>
        <Helmet>
          <title>{data.name}</title>
          <meta name="description" content={data.description} />
          <meta
            name="keywords"
            content={Object.values(data.tags).flat().filter(Boolean).join(", ")}
          />
          <meta name="apple-mobile-web-app-title" content="ok-base.ru" />
          <meta name="application-name" content="ok-base.ru" />
          <meta property="og:title" content={data.name} />
          <meta property="og:description" content={data.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://ok-base.ru" />
          <meta
            property="og:image"
            content={`https://ok-base.ru${metaImage}`}
          />
          <meta
            property="og:image:secure_url"
            content={`https://ok-base.ru${metaImage}`}
          />
          <meta property="og:image:type" content="image/jpg" />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="300" />
        </Helmet>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openSnackBar}
          onClose={handleCloseSnackBar}
          autoHideDuration={3000}
        >
          <SnackbarContent
            message={
              <Typography>
                Необходимо{" "}
                <Link component={RouterLink} to="/log-in" color="primary.main">
                  авторизоваться
                </Link>{" "}
              </Typography>
            }
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackBar}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />
        </Snackbar>
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
            display: { xs: "none", md: "flex" },
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

              flexWrap: "wrap",
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
            <Button
              type="text"
              onClick={() => {
                loggedIn
                  ? toggleFavorites(data.favorites)
                  : handleOpenSnackBar();
              }}
            >
              {data.favorites
                ? "Удалить из избранного"
                : "Добавить в избранное"}
            </Button>
            <Button type="text" onClick={copyUrlToClipboard}>
              Скопировать ссылку
            </Button>

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
          <Box
            sx={{
              display: "flex",
              gap: 4,
            }}
          >
            <Typography
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              Просмотры:&nbsp;{data.showCount}
            </Typography>{" "}
            <Typography color="text.secondary">{data.date}</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            p: { xs: 2, md: 4 },
            flexDirection: { xs: "column", md: "row" },
            gap: 1,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            component="a"
            href={data.link}
            target="_blank"
            color="primary"
            onClick={() => linkClick({ id: materialDetailId })}
          >
            {data.linkText == "" ? "Перейти по ссылке" : data.linkText}
          </Button>
        </Box>
        <Divider />
        <Stack
          sx={{ display: { xs: "flex", md: "none" } }}
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <IconButton
            sx={{ m: 1 }}
            onClick={() => {
              loggedIn ? toggleFavorites(data.favorites) : handleOpenSnackBar();
            }}
          >
            {data.favorites ? (
              <FavoriteOutlinedIcon />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </IconButton>
          <IconButton sx={{ m: 1 }} onClick={copyUrlToClipboard}>
            <ContentCopyOutlinedIcon />
          </IconButton>
          {filters.my && (
            <IconButton
              sx={{ m: 1 }}
              component={RouterLink}
              to={`/edit-material/${materialDetailId}`}
            >
              <EditOutlinedIcon />
            </IconButton>
          )}
          {filters.my && (
            <IconButton sx={{ m: 1 }} onClick={handleDeleteMaterial}>
              <DeleteForeverOutlinedIcon />
            </IconButton>
          )}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: "flex-end",
              px: 2,
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
              color="text.secondary"
            >
              <VisibilityOutlinedIcon /> {data.showCount}
            </Typography>
            <Typography color="text.secondary">{data.date}</Typography>
          </Box>
        </Stack>
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
        {/* {!filters.my && (
          <List disablePadding sx={{ pb: 2 }} >
            <ListItem sx={{ p: { xs: 2, md: 4 }, pt: { xs: 1.5, md: 4 } }}>
              <Typography variant="h3">Другие материалы:</Typography>
            </ListItem>
            {data.recommendation.length == 0 ? (
              <ListItem sx={{ p: { xs: 2, md: 4 } }}>
                <ListItemText primary={"Пока материалов нет"}></ListItemText>
              </ListItem>
            ) : (
              data.recommendation.map((item, i) => (
                <div key={i}>
                  <ListItem
                    key={i}
                    sx={{
                      p: { xs: 2, md: 4 },
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        gap: 2,
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Link component={RouterLink} to={`/material/${item.id}`}>
                        <Typography variant="h5">
                          {item.name !== "" ? item.name : item.link}
                        </Typography>
                      </Link>
                      <ListItemIcon sx={{ minWidth: "unset" }}>
                        <ArrowOutwardOutlinedIcon />
                      </ListItemIcon>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {item.tags.map((tag, i) => (
                        <Chip key={i} label={tag} />
                      ))}
                    </Box>
                  </ListItem>
                  <Divider />
                </div>
              ))
            )}
          </List>
        )} */}
        {!filters.my && (
          <Stack sx={{ pb: 2 }} divider={<Divider flexItem />}>
            <Typography
              sx={{ p: { xs: 2, md: 4 }, pt: { xs: 1.5, md: 4 } }}
              variant="h3"
            >
              Другие материалы:
            </Typography>
            {data.recommendation.length == 0 ? (
              <Typography sx={{ p: { xs: 2, md: 4 } }}>
                Пока материалов нет
              </Typography>
            ) : (
              data.recommendation.map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    p: { xs: 2, md: 4 },
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      gap: 2,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Link component={RouterLink} to={`/material/${item.id}`}>
                      <Typography variant="h5">
                        {item.name !== "" ? item.name : item.link}
                      </Typography>
                    </Link>
                    <ListItemIcon sx={{ minWidth: "unset" }}>
                      <ArrowOutwardOutlinedIcon />
                    </ListItemIcon>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {item.tags.map((tag, i) => (
                      <Chip key={i} label={tag} />
                    ))}
                  </Box>
                </Box>
              ))
            )}
          </Stack>
        )}
      </>
    );
};

export default MaterialDetail;
