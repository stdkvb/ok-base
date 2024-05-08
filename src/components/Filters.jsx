import { useState } from "react";
import {
  Autocomplete,
  TextField,
  Divider,
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Drawer,
  IconButton,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useSelector, useDispatch } from "react-redux";

import { useGetFiltersQuery } from "../redux/okBaseApi";
import { setFilter } from "../redux/slices/filterSlice";

const Filters = () => {
  //redux states
  const category = useSelector((state) => state.filtersSlice.filters.category);
  const dispatch = useDispatch();

  //handle change
  const onChangeFilter = (name, value) => {
    dispatch(setFilter({ name, value }));
  };

  //get data
  const { data, isLoading } = useGetFiltersQuery(category);

  //user device
  const desktop = useMediaQuery("(min-width:1200px)");

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  if (isLoading) return;
  return (
    <>
      <Typography
        onClick={toggleDrawer(true)}
        variant="h6"
        sx={{
          display: { xs: "flex", lg: "none" },
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          p: { xs: 2, md: 4 },
        }}
      >
        Фильтры
        <IconButton sx={{ p: 0 }}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Typography>
      <Drawer
        variant={desktop && "permanent"}
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
        sx={{
          height: { lg: "fit-content" },
          "& .MuiDrawer-paper": {
            position: "unset",
            boxSizing: "border-box",
          },
        }}
      >
        <Typography
          variant="h6"
          onClick={toggleDrawer(false)}
          sx={{
            display: { xs: "flex", lg: "none" },
            gap: 1,
            alignItems: "center",
            p: { xs: 2, md: 4 },
          }}
        >
          <IconButton sx={{ p: 0 }}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          Назад
        </Typography>
        <Divider />
        <Stack
          direction={{ xs: "column", lg: "row" }}
          divider={<Divider orientation="vertical" flexItem />}
          sx={{ p: 0, gap: 0 }}
        >
          {data.map((filter, i) => (
            <>
              <Autocomplete
                key={i}
                fullWidth
                id={filter.name}
                options={filter.value}
                onChange={(event, newValue) => {
                  onChangeFilter(filter.name, newValue ?? "");
                }}
                sx={{ py: 1, ml: 0, px: { xs: 2, md: 4 } }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label={filter.title}
                    sx={{ mb: 2 }}
                  />
                )}
              />
              <Divider />
            </>
          ))}
        </Stack>
      </Drawer>
    </>
  );
};

export default Filters;
