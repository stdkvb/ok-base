import {
  List,
  ListItem,
  Badge,
  Typography,
  LinearProgress,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetCategoriesQuery } from "../redux/okBaseApi";
import { setFilter, resetFilters } from "../redux/slices/filterSlice";

const Categories = () => {
  //redux states
  const dispatch = useDispatch();

  //get data
  const { data, isLoading } = useGetCategoriesQuery();

  //change category
  const onChangeCategory = (value) => {
    let name = "category";
    dispatch(resetFilters());
    dispatch(setFilter({ name, value }));
  };

  if (isLoading) return <LinearProgress color="secondary" />;
  return (
    <List disablePadding sx={{ pt: 4 }}>
      {data.map((item, i) => (
        <ListItem key={i} disablePadding sx={{ pl: 4, pb: 1 }}>
          <Badge badgeContent={item.count} max={999} showZero>
            <Typography
              component={RouterLink}
              to="/"
              onClick={() => onChangeCategory(item.value)}
            >
              {item.value}
            </Typography>
          </Badge>
        </ListItem>
      ))}
    </List>
  );
};

export default Categories;