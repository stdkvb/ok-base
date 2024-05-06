import { Grid, Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import Card from "./Card";
import { useGetListQuery } from "../redux/okBaseApi";

const Catalog = () => {
  //redux states
  const category = useSelector((state) => state.categories.category);

  //get data
  const { data, isLoading } = useGetListQuery(category);

  //render
  if (isLoading) return <Typography>Загрузка..</Typography>;
  if (data.totalCount == 0)
    return <Typography>Здесь пока что пусто :(</Typography>;
  return (
    <Grid container spacing={2}>
      {data.data.map((card, i) => (
        <Grid key={i} item xs={12} md={6}>
          <Card id={card.id} name={card.name} imageUrl={card.picture} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Catalog;
