import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Stack,
  MenuItem,
  FormControl,
  Select,
  Divider,
  InputLabel,
} from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SortIcon from "@mui/icons-material/Sort";

import { setFilter } from "../redux/slices/filterSlice";
import GoAuthNotification from "./GoAuthNotification";

const Sort = () => {
  const filters = useSelector((state) => state.filtersSlice.filters);
  const loggedIn = useSelector((state) => state.authSlice.loggedIn);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setFilter({ name: event.target.name, value: event.target.value }));
  };

  //notification
  const notificationRef = useRef();
  const handleOpenNotification = (message) => {
    if (notificationRef.current) {
      notificationRef.current.openNotification(message);
    }
  };

  return (
    <>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <FormControl
          fullWidth
          sx={{
            px: { xs: 2, md: 4 },
            py: { xs: 0, md: 3 },
            maxWidth: { xs: "60px", md: "50%" },
          }}
        >
          <InputLabel
            sx={{
              display: { xs: "block", md: "none" },
              position: "absolute",
              top: "23px",
              zIndex: "-1",
              fontSize: "2.3rem",
              left: "3px",
            }}
          >
            <ChecklistIcon fontSize="3.5rem" color="secondary" />
          </InputLabel>
          <Select
            variant="standard"
            disableUnderline
            value={filters.read}
            onChange={(event, target) => {
              loggedIn
                ? handleChange(event)
                : handleOpenNotification(GoAuthNotification);
            }}
            name="read"
            sx={{
              ".MuiSelect-select-MuiInputBase-input-MuiInput-input:focus": {
                backgroundColor: "transparent",
              },
              opacity: { xs: 0, md: 1 },
              marginTop: { xs: "20px", md: "0 !important" },
            }}
          >
            <MenuItem value="Все">Показывать все</MenuItem>
            <MenuItem value="Нет">Показывать неизученные</MenuItem>
            <MenuItem value="Да">Показывать изученные</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          sx={{
            px: { xs: 2, md: 4 },
            py: { xs: 0, md: 3 },
            maxWidth: { xs: "60px", md: "50%" },
          }}
        >
          <InputLabel
            sx={{
              display: { xs: "block", md: "none" },
              position: "absolute",
              top: "23px",
              zIndex: "-1",
              fontSize: "2.3rem",
              left: "3px",
            }}
          >
            <SortIcon fontSize="3.5rem" color="secondary" />
          </InputLabel>
          <Select
            variant="standard"
            disableUnderline
            value={filters.sort}
            onChange={handleChange}
            name="sort"
            sx={{
              ".MuiSelect-select-MuiInputBase-input-MuiInput-input:focus": {
                backgroundColor: "transparent",
              },
              opacity: { xs: 0, md: 1 },
              marginTop: { xs: "20px", md: "0 !important" },
            }}
          >
            <MenuItem value="date">Сортировать по дате</MenuItem>
            <MenuItem value="rating">Сортировать по рейтингу</MenuItem>
          </Select>
        </FormControl>
        <Divider />
      </Stack>
      <Divider />
    </>
  );
};

export default Sort;
