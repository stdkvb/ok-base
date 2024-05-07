import {
  List,
  ListItem,
  Badge,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  Outlet,
  Link as RouterLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useGetCategoriesQuery } from "../redux/okBaseApi";
import { setCategory, resetFilters } from "../redux/slices/filterSlice";

const Categories = ({ closeDrawer }) => {
  //redux states
  const dispatch = useDispatch();

  //get data
  const { data, isLoading } = useGetCategoriesQuery();

  //change category
  const onChangeCategory = (value) => {
    closeDrawer();
    dispatch(resetFilters());
    dispatch(setCategory(value));
  };

  //render
  if (isLoading) return <CircularProgress />;
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
