import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { useGetFiltersQuery } from "../redux/okBaseApi";
import {
  setCompany,
  setPeople,
  setTheme,
  setEvent,
  setGrade,
} from "../redux/slices/filterSlice";

const Filters = () => {
  //redux states
  const dispatch = useDispatch();

  //handle change
  const onChangeFilter = (name, value) => {
    dispatch(
      name == "company"
        ? setCompany(value)
        : name == "theme"
        ? setTheme(value)
        : name == "people"
        ? setPeople(value)
        : name == "event"
        ? setEvent(value)
        : name == "grade" && setGrade(value)
    );
  };

  //get data
  const { data, isLoading } = useGetFiltersQuery();

  if (isLoading) return <Typography>Загрузка..</Typography>;
  return (
    <Grid container spacing={1} sx={{ mb: 3 }}>
      {data.map((filter, i) => (
        <Grid key={i} item xs={12} md={2}>
          <Autocomplete
            id={filter.name}
            options={filter.value}
            onChange={(event, newValue) => {
              onChangeFilter(filter.name, newValue ?? "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label={filter.title}
                InputLabelProps={{
                  shrink: true,
                }}
                size="medium"
              />
            )}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Filters;
