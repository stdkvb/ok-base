import {
  Autocomplete,
  TextField,
  Divider,
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

  if (isLoading) return;
  return (
    <>
      <Accordion disableGutters={true} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ px: { xs: 2, md: 4 }, display: { xs: "flex", md: "none" } }}
        >
          <Typography>Фильтры</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails sx={{ p: 0 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            divider={<Divider orientation="vertical" flexItem />}
            sx={{ px: { xs: 2, md: 4 }, gap: { xs: 0, md: 2 } }}
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
                <Divider />
              </>
            ))}
          </Stack>
        </AccordionDetails>
        <Divider />
      </Accordion>
    </>
  );
};

export default Filters;
