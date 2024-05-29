import { useState } from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { setFilter } from "../redux/slices/filterSlice";

const Sort = () => {
  const read = useSelector((state) => state.filtersSlice.filters.read);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setFilter({ name: "read", value: event.target.value }));
  };

  return (
    <>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <FormControl fullWidth sx={{ maxWidth: { xs: "unset", md: "240px" } }}>
          <InputLabel shrink id="demo-simple-select-label" sx={{ ml: "-14px" }}>
            Показать:
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="standard"
            disableUnderline
            value={read}
            onChange={handleChange}
            sx={{
              ".MuiSelect-select-MuiInputBase-input-MuiInput-input:focus": {
                backgroundColor: "transparent",
              },
            }}
          >
            <MenuItem value="Все">Все</MenuItem>
            <MenuItem value="Нет">Только непрочитанные</MenuItem>
            <MenuItem value="Да">Только прочитанные</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Divider />
    </>
  );
};

export default Sort;
