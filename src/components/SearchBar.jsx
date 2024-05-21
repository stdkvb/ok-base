import { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";

import { resetFilters, setFilter } from "../redux/slices/filterSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  //search drawer
  const [searchDrawer, setSearchDrawer] = useState(false);
  const toggleSearchDrawer = (newSearchDrawer) => () => {
    setSearchDrawer(newSearchDrawer);
  };

  //search value
  const [searchValue, setSearchValue] = useState("");

  //handle search
  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(resetFilters());
    dispatch(setFilter({ name: "search", value: searchValue }));
    setSearchValue("");
  };

  return (
    <>
      <IconButton
        sx={{ mx: { xs: 1.1, md: 4 } }}
        onClick={toggleSearchDrawer(true)}
      >
        <SearchIcon />
      </IconButton>
      <Drawer
        anchor="top"
        open={searchDrawer}
        onClose={toggleSearchDrawer(false)}
      >
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            display: "flex",
            gap: 2,
            alignItems: { xs: "flex-start", md: "center" },
            flexDirection: { xs: "column", md: "row" },
            height: { xs: "auto", md: "90px" },
            py: { xs: 2, md: 0 },
          }}
        >
          <Typography
            sx={{
              px: { xs: 2, md: 4 },
            }}
          >
            Поиск&nbsp;по&nbsp;сайту
          </Typography>
          <Box
            sx={{
              px: { xs: 2, md: 4 },
              display: "flex",
              gap: 2,
              width: "100%",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <TextField
              sx={{ maxWidth: { xs: "unset", md: "500px" } }}
              size="small"
              fullWidth
              id="search"
              name="search"
              label="Введите запрос"
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{ minWidth: "100px", minHeight: "40px" }}
              onClick={toggleSearchDrawer(false)}
            >
              Найти
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default SearchBar;
