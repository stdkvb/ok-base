import { useEffect, useState } from "react";
import {
  Pagination as MuiPagination,
  Typography,
  Stack,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/slices/filterSlice";
import { Link } from "react-router-dom";

const Pagination = ({ totalCount }) => {
  //redux states
  const filters = useSelector((state) => state.filtersSlice.filters);
  const dispatch = useDispatch();

  const handleChangePage = (event, value) => {
    dispatch(setFilter({ name: "page", value }));
  };

  const [limit, setLimit] = useState("5");

  const handleChangeLimit = (event, newLimit) => {
    setLimit(newLimit);
    dispatch(setFilter({ name: "limit", value: newLimit.toString() }));
  };

  //show more
  const handleShowMore = (event) => {
    dispatch(
      setFilter({
        name: "limit",
        value: (Math.floor(filters.limit) + 10).toString(),
      })
    );
  };

  return (
    <Stack
      sx={{
        mt: "auto",
        mb: 0,
        p: { xs: 2, md: 4 },
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: { md: "column", lg: "row" },
        gap: 1,
      }}
    >
      <MuiPagination
        count={Math.ceil(totalCount / filters.limit)}
        page={filters.page}
        onChange={handleChangePage}
        shape="rounded"
        hidePrevButton
        hideNextButton
      />
      <Button variant="text" onClick={handleShowMore}>
        Показать еще
      </Button>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Typography mr={2}>Показывать по:</Typography>
        <ToggleButtonGroup
          color="secondary"
          value={limit}
          exclusive
          onChange={handleChangeLimit}
          aria-label="Platform"
          sx={{
            alignItems: "center",
            gap: 1,
          }}
        >
          <ToggleButton size="small" value="5">
            5
          </ToggleButton>
          <ToggleButton size="small" value="10">
            10
          </ToggleButton>
          <ToggleButton size="small" value="20">
            20
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
};
export default Pagination;
