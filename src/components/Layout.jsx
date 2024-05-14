import { useState } from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";

import { resetFilters } from "../redux/slices/filterSlice";
import Categories from "./Categories";

const drawerWidth = 256;

function Layout(props) {
  //redux states
  const auth = useSelector((state) => state.authSlice.auth);

  const dispatch = useDispatch();

  const { window } = props;
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

  const drawer = (
    <Stack sx={{ height: "100%" }} onClick={() => handleDrawerClose()}>
      <Toolbar
        sx={{ height: { xs: "60px", md: "90px" }, pl: 4 }}
        disableGutters={true}
      >
        <Typography
          component={RouterLink}
          to="/"
          onClick={() => {
            dispatch(resetFilters());
          }}
        >
          OK-BASE
        </Typography>
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
      <List disablePadding sx={{ mt: "auto", mb: 0, pb: 4 }}>
        {["О проекте"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ pl: 4 }}>
            <Typography component={RouterLink} to="/">
              {text}
            </Typography>
          </ListItem>
        ))}
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
            height: { xs: "60px", md: "90px" },
            pl: { xs: 2, md: 4 },
            pr: 0,
          }}
          disableGutters={true}
        >
          <IconButton
            color="inherit"
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
          >
            Открытая база знаний для руководителей и менеджеров ИТ-проектов
          </Typography>
          <Typography
            variant="h4"
            sx={{ flexGrow: 1, display: { xs: "block", md: "none" } }}
            component={RouterLink}
            to="/"
            onClick={() => {
              dispatch(resetFilters());
            }}
          >
            OKB
          </Typography>
          <Divider orientation="vertical" />
          <IconButton sx={{ px: { xs: 2, md: 4 } }}>
            <SearchIcon />
          </IconButton>
          <Divider orientation="vertical" />
          <IconButton
            sx={{ px: { xs: 2, md: 4 } }}
            component={RouterLink}
            to={auth ? "/favorites" : "/log-in"}
          >
            <FavoriteBorderOutlinedIcon />
          </IconButton>
          <Divider orientation="vertical" />
          <IconButton
            sx={{ px: { xs: 2, md: 4 } }}
            component={RouterLink}
            to={auth ? "/profile" : "/log-in"}
          >
            <PersonOutlineOutlinedIcon />
          </IconButton>
          <Divider orientation="vertical" />
          <IconButton sx={{ px: { xs: 2, md: 4 } }}>
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
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
        <Toolbar
          sx={{
            height: { xs: "60px", md: "90px" },
            p: { xs: 2, md: 4 },
          }}
          disableGutters={true}
        >
          <Typography>© 2024 OK-BASE</Typography>
        </Toolbar>
      </Box>
    </Box>
  );
}

export default Layout;
