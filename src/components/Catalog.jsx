import { useEffect, useState, useRef } from "react";
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Link,
  Chip,
  Box,
  Stack,
} from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import { useSelector, useDispatch } from "react-redux";

import PageTitle from "./PageTitle";
import Filters from "./Filters";
import Sort from "./Sort";
import FilterTags from "./FilterTags";
import Pagination from "./Pagination";
import { useGetListQuery } from "../redux/okBaseApi";
import { setFilter } from "../redux/slices/filterSlice";

const Catalog = () => {
  const filters = useSelector((state) => state.filtersSlice.filters);

  const { data, isLoading } = useGetListQuery(filters);

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const key = Array.from(searchParams.keys())[0];
    const value = searchParams.get(key);

    if (key && value) {
      dispatch(setFilter({ name: key, value: value }));
      dispatch(setFilter({ name: "tag", value: value }));
    }
  }, []);

  if (isLoading) return;
  return (
    <>
      <PageTitle />
      <Stack
        sx={{
          flexDirection: { xs: "row", md: "column-reverse" },
        }}
      >
        <Sort />
        <Filters filters={filters} />
      </Stack>

      <Divider />
      <FilterTags totalCount={data.totalCount} />
      <List disablePadding>
        {data.totalCount == 0 ? (
          <>
            <ListItem sx={{ p: { xs: 2, md: 4 } }}>
              <ListItemText
                primary={
                  filters.search ? "Ничего не найдено" : "Пока материалов нет"
                }
              ></ListItemText>
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
                  {item.tags.all &&
                    item.tags.all.map((tag, i) => (
                      <Chip key={i} label={tag} sx={{ opacity: "0.7" }} />
                    ))}
                  {item.tags.myTags &&
                    item.tags.myTags.map((tag, i) => (
                      <Chip
                        variant="outlined"
                        key={i}
                        label={tag}
                        sx={{ opacity: "0.7" }}
                      />
                    ))}
                </Box>
              </ListItem>
              <Divider />
            </div>
          ))
        )}
      </List>
      {data.totalCount >= 10 && <Pagination totalCount={data.totalCount} />}
    </>
  );
};

export default Catalog;
