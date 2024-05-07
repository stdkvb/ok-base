import { Autocomplete, TextField, Divider, Stack } from "@mui/material";
import { useDispatch } from "react-redux";

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

  if (isLoading) return;
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      sx={{ px: { xs: 2, md: 4 } }}
    >
      {data.map((filter, i) => (
        <Autocomplete
          key={i}
          fullWidth
          id={filter.name}
          options={filter.value}
          onChange={(event, newValue) => {
            onChangeFilter(filter.name, newValue ?? "");
          }}
          sx={{ py: 1, ml: 0 }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label={filter.title}
              sx={{ mb: 2 }}
            />
          )}
        />
      ))}
    </Stack>
  );
};

export default Filters;
