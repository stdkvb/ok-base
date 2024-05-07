import {
  Grid,
  Typography,
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Outlet,
  Link as RouterLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import { useSelector, useDispatch } from "react-redux";

import Filters from "./Filters";
import Card from "./Card";
import { useGetListQuery } from "../redux/okBaseApi";

const Catalog = () => {
  //redux states
  const filters = useSelector((state) => state.filtersSlice.filters);

  //get data
  const { data, isLoading } = useGetListQuery(filters);

  //render
  if (isLoading) return <Typography>Загрузка..</Typography>;

  return (
    <>
      <Filters />
      <Divider />
      <List disablePadding>
        {data.totalCount == 0 ? (
          <ListItem sx={{ p: 4 }}>
            <ListItemText primary={"Ничего не найдено :("}></ListItemText>
          </ListItem>
        ) : (
          data.data.map((item, i) => (
            <>
              <ListItem
                key={i}
                item
                sx={{ p: 4, gap: 2 }}
                component={RouterLink}
                to="/"
              >
                <ListItemText
                  primary={<Typography variant="h5">{item.name}</Typography>}
                />
                <ListItemIcon>
                  <ArrowOutwardOutlinedIcon />
                </ListItemIcon>
              </ListItem>
              <Divider />
            </>
          ))
        )}
      </List>
    </>
  );
};

export default Catalog;
