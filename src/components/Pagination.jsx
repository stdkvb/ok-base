import { useState } from "react";
import {
  Pagination as MuiPagination,
  Typography,
  Stack,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/slices/filterSlice";
import { Link } from "react-router-dom";

const Pagination = ({ totalCount }) => {
  //redux states
  const filters = useSelector((state) => state.filtersSlice.filters.page);
  const dispatch = useDispatch();

  const handleChangePage = (event, value) => {
    let name = "page";
    dispatch(setFilter({ name, value }));
  };

  const [limit, setLimit] = useState(filters.limit);
  const handleChangeLimit = (event, newLimit) => {
    setLimit(newLimit);
    console.log(newLimit);
    let name = "limit";
    dispatch(setFilter({ name, newLimit }));
  };

  return (
    <Stack
      direction="row"
      sx={{
        mt: "auto",
        mb: 0,
        p: { xs: 2, md: 4 },
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <MuiPagination
        count={Math.ceil(totalCount / 10)}
        page={filters.page}
        onChange={handleChangePage}
      />
      {/* <ToggleButtonGroup
        color="primary"
        value={limit}
        exclusive
        onChange={handleChangeLimit}
        aria-label="Platform"
      >
        <ToggleButton value="5">5</ToggleButton>
        <ToggleButton value="10">10</ToggleButton>
        <ToggleButton value="20">20</ToggleButton>
      </ToggleButtonGroup> */}
    </Stack>
  );
};
export default Pagination;
