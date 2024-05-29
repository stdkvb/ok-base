import { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
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
  Menu,
  MenuItem,
  Switch,
  FormControlLabel,
  Rating,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useParams } from "react-router-dom";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Tags from "../components/Tags";
import Note from "../components/Note";
import Notification from "../components/Notification";
import ErrorPage from "./ErrorPage";

import {
  useGetMaterialDetailQuery,
  useDeleteMaterialMutation,
  useAddFavoritesMutation,
  useRemoveFavoritesMutation,
  useLinkClickMutation,
  useAddReadMutation,
  useRemoveReadMutation,
  useAddRatingMutation,
} from "../redux/okBaseApi";

const MaterialDetail = () => {
  const navigate = useNavigate();
  const filters = useSelector((state) => state.filtersSlice.filters);
  const loggedIn = useSelector((state) => state.authSlice.loggedIn);
  let { materialDetailId } = useParams();

  //get data
  const { data, isLoading, error } = useGetMaterialDetailQuery({
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

  //notification
  const notificationRef = useRef();
  const handleOpenNotification = (message) => {
    if (notificationRef.current) {
      notificationRef.current.openNotification(message);
    }
  };

  const goAuthNotification = (
    <Typography>
      Необходимо{" "}
      <Link component={RouterLink} to="/log-in" color="primary.main">
        авторизоваться
      </Link>{" "}
    </Typography>
  );

  useEffect(() => {
    if (successAddFavorites) {
      handleOpenNotification("Материал добавлен в избранное");
    }
  }, [successAddFavorites]);

  useEffect(() => {
    if (successRemoveFavorites) {
      handleOpenNotification("Материал удалён из избранного");
    }
  }, [successRemoveFavorites]);

  //edit&rating menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuId, setMenuId] = useState(null);

  const openMenu = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setMenuId(null);
  };

  //check as readed
  const [addRead] = useAddReadMutation();
  const [removeRead] = useRemoveReadMutation();

  const toggleRead = (isRead) => {
    isRead
      ? removeRead({ id: materialDetailId })
      : addRead({ id: materialDetailId });
  };

  //rate material
  const [addRating] = useAddRatingMutation();

  const handleAddRating = (event, newValue) => {
    loggedIn
      ? addRating({ id: materialDetailId, score: newValue })
      : handleOpenNotification(goAuthNotification);
    closeMenu();
  };

  if (isLoading) return;
  if (error) return <ErrorPage />;
  if (data)
    return (
      <>
        <Helmet>
          <title>{data.name}</title>
          <meta name="description" content={data.description} />
          <meta property="og:title" content={data.name} />
          <meta property="og:description" content={data.description} />
        </Helmet>
        <Notification ref={notificationRef} />
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Typography
            variant="h3"
            sx={{
              lineHeight: 1,
              mb: { xs: 2, md: 4 },
            }}
          >
            {data.name}
          </Typography>
          <Typography color="text.secondary">{data.date}</Typography>
        </Box>
        <Divider />
        <Stack
          direction={{ xs: "column", md: "row" }}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={0}
        >
          <Box sx={{ width: "100%", p: { xs: 2, md: 4 } }}>
            <Typography sx={{ mb: { xs: 2, md: 4 } }}>
              {data.description}
            </Typography>
            <Button
              variant="contained"
              component="a"
              href={data.link}
              target="_blank"
              color="primary"
              onClick={() => linkClick({ id: materialDetailId })}
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              {data.linkText == "" ? "Перейти по ссылке" : data.linkText}
            </Button>
          </Box>
          <Tags data={data} />
        </Stack>
        <Divider />
        <Stack
          sx={{ display: "flex" }}
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <IconButton
            sx={{ m: { xs: 1, md: 3 } }}
            onClick={() => {
              loggedIn
                ? toggleFavorites(data.favorites)
                : handleOpenNotification(goAuthNotification);
            }}
          >
            {data.favorites ? (
              <FavoriteOutlinedIcon />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </IconButton>
          <IconButton
            sx={{ m: { xs: 1, md: 3 } }}
            onClick={() => {
              copyUrlToClipboard();
              handleOpenNotification("Ссылка скопирована");
            }}
          >
            <ContentCopyOutlinedIcon />
          </IconButton>
          {filters.my && (
            <>
              <IconButton
                sx={{ m: { xs: 1, md: 3 } }}
                aria-haspopup="true"
                onClick={(event) => openMenu(event, "editMenu")}
              >
                <MoreHorizIcon />
              </IconButton>
            </>
          )}
          <IconButton
            sx={{
              m: { xs: 1, md: 3 },
              display: { xs: "flex", md: "none" },
              gap: 1,
            }}
            aria-haspopup="true"
            onClick={(event) => openMenu(event, "ratingMenu")}
          >
            <StarBorderIcon />
            <Typography color="text.secondary">
              {data.rating ? data.rating : "0"}/5
            </Typography>
          </IconButton>

          <Stack
            direction="row"
            sx={{
              ml: "auto",
            }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Stack
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography component="legend" color="text.secondary">
                  {data.rating ? data.rating : "0"}/5
                </Typography>
                <Rating
                  readOnly={!data.rate}
                  name="half-rating"
                  defaultValue={data.rating !== null ? Number(data.rating) : 0}
                  onChange={handleAddRating}
                />
              </Stack>
            </Box>

            <Typography
              sx={{
                p: { xs: 2, md: 4 },
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
              color="text.secondary"
            >
              <VisibilityOutlinedIcon /> {data.showCount}
            </Typography>
          </Stack>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
          >
            {menuId === "editMenu" && (
              <>
                <MenuItem
                  sx={{ py: 0 }}
                  component={RouterLink}
                  to={`/edit-material/${materialDetailId}`}
                >
                  <EditOutlinedIcon sx={{ mr: 1 }} />
                  Редактировать
                </MenuItem>
                <Divider />
                <MenuItem sx={{ py: 0 }} onClick={handleDeleteMaterial}>
                  <DeleteForeverOutlinedIcon sx={{ mr: 1 }} />
                  Удалить
                </MenuItem>
              </>
            )}
            {menuId === "ratingMenu" && (
              <MenuItem>
                <Rating
                  readOnly={!data.rate}
                  name="half-rating"
                  defaultValue={data.rating ? Number(data.rating) : 0}
                  onChange={handleAddRating}
                />
              </MenuItem>
            )}
          </Menu>
        </Stack>
        <Divider />
        <FormControlLabel
          control={
            <Switch
              checked={data && data.read}
              onChange={() => {
                loggedIn
                  ? toggleRead(data && data.read)
                  : handleOpenNotification(goAuthNotification);
              }}
            />
          }
          label="Изучил"
          sx={{
            m: { xs: 1, md: 3 },
            "& .MuiFormControlLabel-label": {
              color: "#9b9b9b",
            },
          }}
        />
        <Divider />
        <Button
          variant="contained"
          component="a"
          href={data.link}
          target="_blank"
          color="primary"
          onClick={() => linkClick({ id: materialDetailId })}
          sx={{ display: { xs: "flex", md: "none" }, m: 2 }}
        >
          {data.linkText == "" ? "Перейти по ссылке" : data.linkText}
        </Button>
        <Divider />
        {loggedIn && (filters.my || filters.favorites) && (
          <Note initialValue={data.note} materialId={materialDetailId} />
        )}
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
                      <Chip key={i} label={tag} sx={{ opacity: "0.7" }} />
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
