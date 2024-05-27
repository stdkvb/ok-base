import { useRef, useState } from "react";
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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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

import MetaTags from "../components/MetaTags";
import Tags from "../components/Tags";
import Note from "../components/Note";
import Notification from "../components/Notification";

import {
  useGetMaterialDetailQuery,
  useDeleteMaterialMutation,
  useAddFavoritesMutation,
  useRemoveFavoritesMutation,
  useLinkClickMutation,
  useAddReadMutation,
  useRemoveReadMutation,
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

  //edit menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  //check as readed
  const [addRead] = useAddReadMutation();
  const [removeRead] = useRemoveReadMutation();

  const toggleRead = (isRead) => {
    isRead
      ? removeRead({ id: materialDetailId })
      : addRead({ id: materialDetailId });
  };

  const readSwitch = (
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
        m: { xs: 1, md: 0 },
        "& .MuiFormControlLabel-label": {
          color: "#9b9b9b",
        },
      }}
    />
  );

  if (isLoading) return;
  if (data)
    return (
      <>
        <MetaTags title={data.name} description={data.description} />
        <Notification ref={notificationRef} />
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
                  : handleOpenNotification(goAuthNotification);
              }}
            >
              {data.favorites
                ? "Удалить из избранного"
                : "Добавить в избранное"}
            </Button>
            <Button
              type="text"
              onClick={() => {
                copyUrlToClipboard();
                handleOpenNotification("Ссылка скопирована");
              }}
            >
              Скопировать ссылку
            </Button>

            {!filters.my && readSwitch}

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
            sx={{ m: 1 }}
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
                sx={{ m: 1 }}
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={openMenu}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={closeMenu}
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
              >
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
              </Menu>
            </>
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
        <Divider sx={{ display: { xs: "flex", md: "none" } }} />
        {!filters.my && (
          <>
            <Stack
              sx={{ display: { xs: "flex", md: "none" } }}
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
            >
              {readSwitch}
            </Stack>
            <Divider sx={{ display: { xs: "flex", md: "none" } }} />
          </>
        )}

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
