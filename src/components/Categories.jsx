import {
  List,
  ListItem,
  Badge,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { useGetCategoriesQuery } from "../redux/okBaseApi";
import { setCategory } from "../redux/slices/categoriesSlice";

const Categories = () => {
  //redux states
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories.category);

  //get data
  const { data, isLoading } = useGetCategoriesQuery();

  //change category
  const onChangeCategory = (value) => {
    dispatch(setCategory(value));
  };

  //render
  if (isLoading) return <CircularProgress />;
  return (
    <List disablePadding sx={{ pt: 4 }}>
      {data.map((item, i) => (
        <ListItem key={i} disablePadding sx={{ pl: 4, pb: 1 }}>
          <Badge badgeContent={item.count} max={999} showZero>
            <Typography onClick={() => onChangeCategory(item.value)}>
              {item.value}
            </Typography>
          </Badge>
        </ListItem>
      ))}
    </List>
  );
};

export default Categories;
