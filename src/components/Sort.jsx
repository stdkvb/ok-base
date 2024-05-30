import { useRef } from "react";
import {
  Stack,
  MenuItem,
  FormControl,
  Select,
  Divider,
  Link,
  Typography,
  InputLabel,
  IconButton,
  OutlinedInput,
  TextField,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Notification from "./Notification";
import { setFilter } from "../redux/slices/filterSlice";

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

  const goAuthNotification = (
    <Typography>
      Необходимо{" "}
      <Link component={RouterLink} to="/log-in" color="primary.main">
        авторизоваться
      </Link>{" "}
    </Typography>
  );

  return (
    <>
      <Notification ref={notificationRef} />
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
              top: "20px",
              zIndex: "-1",
              fontSize: "2.8rem",
            }}
          >
            <CheckCircleOutlineIcon fontSize="3.5rem" color="secondary" />
          </InputLabel>
          <Select
            variant="standard"
            disableUnderline
            value={filters.read}
            onChange={(event, target) => {
              loggedIn
                ? handleChange(event)
                : handleOpenNotification(goAuthNotification);
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
            <MenuItem value="Нет">Показывать непрочитанные</MenuItem>
            <MenuItem value="Да">Показывать прочитанные</MenuItem>
          </Select>
        </FormControl>
        <Divider />
        {/* <FormControl
          fullWidth
          sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 3 } }}
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="standard"
            disableUnderline
            value={filters.sort}
            onChange={handleChange}
            name="sort"
            sx={{
              ".MuiSelect-select-MuiInputBase-input-MuiInput-input:focus": {
                backgroundColor: "transparent",
              },
            }}
          >
            <MenuItem value="date">Сортировать по дате</MenuItem>
            <MenuItem value="rating">Сортировать по рейтингу</MenuItem>
          </Select>
        </FormControl> */}
      </Stack>
      <Divider />
    </>
  );
};

export default Sort;
