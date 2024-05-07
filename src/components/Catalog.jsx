import { Grid, Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import Filters from "./Filters";
import Card from "./Card";
import { useGetListQuery } from "../redux/okBaseApi";

const Catalog = () => {
  //redux states
  const filters = useSelector((state) => state.filtersSlice.filters);

  //get data
  const { data, isLoading } = useGetListQuery(filters);

  //render
  if (isLoading) return <Typography>Загрузка..</Typography>;

  return (
    <>
      <Filters />
      <Grid container spacing={2}>
        {data.totalCount == 0 ? (
          <Typography>Ничего не найдено :(</Typography>
        ) : (
          data.data.map((card, i) => (
            <Grid key={i} item xs={12} md={6}>
              <Card id={card.id} name={card.name} imageUrl={card.picture} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default Catalog;
