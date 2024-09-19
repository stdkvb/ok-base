import { useEffect, useState } from "react";
import { Divider, Chip, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useGetFiltersQuery } from "../redux/okBaseApi";
import { setFilter } from "../redux/slices/filterSlice";

const FilterTags = ({ totalCount }) => {
  const [activeFilters, setActiveFilters] = useState([]);
  const filters = useSelector((state) => state.filtersSlice.filters);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.filtersSlice.filters.category);
  const { data, isLoading } = useGetFiltersQuery(category);

  const onChangeFilter = (name, value) => {
    dispatch(setFilter({ name, value }));
  };

  useEffect(() => {
    if (!filters || !data) return;
    const activeFiltersData = data.reduce((acc, filter) => {
      for (const [key, value] of Object.entries(filters)) {
        if (filter.name === key && value) {
          const filterWithValue = {
            ...filter,
            selectedValue: value,
          };
          acc.push(filterWithValue);
        }
      }
      return acc;
    }, []);
    setActiveFilters(activeFiltersData);
  }, [filters, category, data]);

  if (isLoading) return;

  return (
    activeFilters &&
    !!activeFilters.length && (
      <>
        <Box
          sx={{
            display: "flex",
            p: { xs: 2, md: 4 },
            flexDirection: "column",
            gap: 2,
          }}
        >
          Материалов найдено {totalCount} по выбранным фильтрам:
          <Box display="flex" gap={1} flexWrap="wrap">
            {activeFilters.map(({ title, name, selectedValue }) => (
              <Chip
                key={title}
                label={`${title}: ${selectedValue}`}
                variant="outlined"
                onDelete={() => {
                  onChangeFilter(name, "");
                }}
              />
            ))}
          </Box>
        </Box>
        <Divider />
      </>
    )
  );
};

export default FilterTags;
