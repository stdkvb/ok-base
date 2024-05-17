import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Link,
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
          <>
            <ListItem sx={{ p: { xs: 2, md: 4 } }}>
              <ListItemText primary={"Пока материалов нет"}></ListItemText>
            </ListItem>
            {filters.my && (
              <ListItem sx={{ p: { xs: 2, md: 4 } }}>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={"/create-material"}
                  sx={{ width: { xs: "100%", md: "fit-content" } }}
                >
                  Добавить материал
                </Button>
              </ListItem>
            )}
          </>
        ) : (
          data.data.map((item, i) => (
            <div key={i}>
              <ListItem
                key={i}
                sx={{
                  p: { xs: 2, md: 4 },
                  gap: 2,
                  justifyContent: "space-between",
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
              </ListItem>
              <Divider />
            </div>
          ))
        )}
      </List>

      <Pagination totalCount={data.totalCount} />
    </>
  );
};

export default Catalog;
