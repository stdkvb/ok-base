import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import { useSelector } from "react-redux";

import Filters from "./Filters";
import { useGetListQuery } from "../redux/okBaseApi";

const Catalog = () => {
  //redux states
  const filters = useSelector((state) => state.filtersSlice.filters);

  //get data
  const { data, isLoading } = useGetListQuery(filters);

  if (isLoading) return;
  return (
    <>
      {filters.category && (
        <>
          <Typography
            variant="h2"
            sx={{
              py: { xs: 2, md: 8 },
              px: { xs: 2, md: 4 },
            }}
          >
            {filters.category}
          </Typography>
          <Divider />
        </>
      )}
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
                to={`material/${item.id}`}
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
