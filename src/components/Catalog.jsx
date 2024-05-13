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
import Pagination from "./Pagination";
import { useGetListQuery } from "../redux/okBaseApi";

const Catalog = () => {
  //redux states
  const filters = useSelector((state) => state.filtersSlice.filters);

  //get data
  const { data, isLoading } = useGetListQuery(filters);

  if (isLoading) return;
  return (
    <>
      {filters.category && !filters.tag && (
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
      {filters.tag && (
        <>
          <Typography
            variant="h2"
            sx={{
              py: { xs: 2, md: 8 },
              px: { xs: 2, md: 4 },
            }}
          >
            #{filters.tag}
          </Typography>
          <Divider />
        </>
      )}
      {!filters.tag && <Filters />}

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
                sx={{ p: { xs: 2, md: 4 }, gap: 2 }}
                component={RouterLink}
                to={`material/${item.id}`}
              >
                <ListItemText
                  primary={<Typography variant="h5">{item.name}</Typography>}
                />
                <ListItemIcon sx={{ minWidth: "unset" }}>
                  <ArrowOutwardOutlinedIcon />
                </ListItemIcon>
              </ListItem>
              <Divider />
            </>
          ))
        )}
      </List>
      <Pagination totalCount={data.totalCount} />
    </>
  );
};

export default Catalog;
