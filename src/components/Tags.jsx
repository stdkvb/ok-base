import { Box, Chip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setFilter, setTag, resetFilters } from "../redux/slices/filterSlice";

const Tags = ({ data }) => {
  //redux states
  const dispatch = useDispatch();

  //change filters on tag click
  const onTagClick = (name, tag) => {
    let value = tag;
    dispatch(resetFilters());
    dispatch(setFilter({ name, value }));
    dispatch(setTag(value));
  };

  return (
    <Box
      sx={{
        flexGrow: "1",
        display: "flex",
        gap: 1,
        minWidth: "30%",
        height: "fit-content",
        alignItems: "flex-start",
        flexWrap: "wrap",
        p: { xs: 2, md: 4 },
      }}
    >
      {Object.keys(data.tags).map((key) =>
        data.tags[key].map((tag, index) => (
          <Chip
            key={`${key}-${index}`}
            label={tag}
            variant={key === "myTags" ? "outlined" : "default"}
            component={RouterLink}
            to={{
              pathname: "/",
              search: `${tag}`,
            }}
            onClick={() => onTagClick(key, tag)}
          />
        ))
      )}
    </Box>
  );
};

export default Tags;
