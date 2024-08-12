import { useState, useRef, useEffect } from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
  Stack,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import { clearToken } from "../redux/slices/authSlice";
import { setFilter, resetFilters } from "../redux/slices/filterSlice";
import { toggleDarkMode } from "../redux/slices/themeSlice";
import {
  addNotification,
  showNotificationDeleteMaterial,
} from "../redux/slices/notificationSlice";
import SearchBar from "./SearchBar";
import Categories from "./Categories";
import Footer from "./Footer";
import GoAuthNotification from "./GoAuthNotification";

const drawerWidth = 200;

function Layout() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.authSlice.loggedIn);
  const darkMode = useSelector((state) => state.themeSlice.darkMode);
  const showNotificationMaterialDelete = useSelector(
    (state) => state.notificationSlice.deleteMatarial
  );

  //nav drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  useEffect(() => {
    if (showNotificationMaterialDelete) {
      dispatch(addNotification("Материал удалён"));
      dispatch(showNotificationDeleteMaterial(false));
    }
  }, [showNotificationMaterialDelete]);

  const drawer = (
    <Stack sx={{ height: "100%" }} onClick={() => handleDrawerClose()}>
      <Toolbar
        sx={{ height: { xs: "50px", md: "90px" }, pl: 4 }}
        disableGutters={true}
      >
        <Link
          component={RouterLink}
          to="/"
          onClick={() => {
            dispatch(resetFilters());
          }}
        >
          OK-BASE
        </Link>
        <Divider
          orientation="vertical"
          sx={{ display: { sm: "none" }, ml: "auto" }}
        />
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ display: { sm: "none" }, px: { xs: 2, md: 4 } }}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <Categories />
      <List
        disablePadding
        sx={{
          mt: "auto",
          mb: 0,
          pb: 4,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {loggedIn && (
          <ListItem disablePadding sx={{ pl: 4 }}>
            <Link
              component={RouterLink}
              to="/my-materials"
              onClick={() => {
                dispatch(resetFilters());
                dispatch(setFilter({ name: "my", value: true }));
              }}
            >
              Мои материалы
            </Link>
          </ListItem>
        )}
        <ListItem disablePadding sx={{ pl: 4 }}>
          <Link
            component={RouterLink}
            to={loggedIn && "/favorites"}
            onClick={
              loggedIn
                ? () => {
                    dispatch(resetFilters());
                    dispatch(setFilter({ name: "favorites", value: true }));
                  }
                : () => {
                    dispatch(addNotification(GoAuthNotification));
                  }
            }
          >
            Избранное
          </Link>
        </ListItem>
        <ListItem disablePadding sx={{ pl: 4 }}>
          <Link component={RouterLink} to="/about">
            О проекте
          </Link>
        </ListItem>
        {loggedIn && (
          <ListItem disablePadding sx={{ pl: 4 }}>
            <Link
              component={RouterLink}
              to="/"
              onClick={() => dispatch(clearToken())}
            >
              Выйти
            </Link>
          </ListItem>
        )}
      </List>
    </Stack>
  );

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <AppBar
        position="fixed"
        sx={{
          height: "fit-content",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: "unset",
          backgroundImage: "unset",
        }}
      >
        <Toolbar
          sx={{
            height: { xs: "50px", md: "90px" },
            pl: { xs: 2, md: 4 },
            pr: 0,
          }}
          disableGutters={true}
        >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" }, px: { xs: 2, md: 4 } }}
          >
            <MenuIcon />
          </IconButton>
          <Divider
            orientation="vertical"
            sx={{ display: { sm: "none" }, mr: 2 }}
          />
          <Typography
            variant="p"
            sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}
            color="text.secondary"
          >
            Открытая база знаний для руководителей и менеджеров ИТ-проектов
          </Typography>
          <Link
            variant="h4"
            sx={{ flexGrow: 1, display: { xs: "block", md: "none" } }}
            component={RouterLink}
            to="/"
            onClick={() => {
              dispatch(resetFilters());
            }}
          >
            OKB
          </Link>
          <Divider orientation="vertical" />
          <SearchBar />

          <Divider orientation="vertical" />
          <IconButton
            sx={{ mx: { xs: 1.1, md: 4 } }}
            onClick={() => {
              dispatch(toggleDarkMode());
            }}
          >
            {darkMode ? <LightModeOutlinedIcon /> : <NightlightOutlinedIcon />}
          </IconButton>
          <Divider orientation="vertical" />
          <IconButton
            sx={{ mx: { xs: 1.1, md: 4 } }}
            component={RouterLink}
            to={loggedIn ? "/profile" : "/log-in"}
          >
            <PersonOutlineOutlinedIcon />
          </IconButton>
          <Divider orientation="vertical" />
          <IconButton
            sx={{ mx: { xs: 1.1, md: 4 } }}
            component={RouterLink}
            to={loggedIn && "/create-material"}
            onClick={() => {
              !loggedIn && dispatch(addNotification(GoAuthNotification));
            }}
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
        <Divider />
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { sm: `${drawerWidth}px` },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          pt: { xs: "60px", md: "90px" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Box>
      <Divider />

      <Box
        component="footer"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}

export default Layout;
