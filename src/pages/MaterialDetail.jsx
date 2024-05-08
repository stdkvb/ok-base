import {
  Typography,
  Divider,
  Stack,
  Box,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import Tags from "../components/Tags";

import { useGetDetailPageQuery } from "../redux/okBaseApi";

const MaterialDetail = () => {
  //get detail page id
  let { detailPageId } = useParams();

  //get data
  const { data, isLoading } = useGetDetailPageQuery(detailPageId);

  if (isLoading) return;
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          py: { xs: 2, md: 8 },
          px: { xs: 2, md: 4 },
        }}
      >
        {data.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: { xs: 2, md: 4 },
        }}
      >
        <Button
          variant="contained"
          component="a"
          href={data.link}
          target="_blank"
          color="primary"
        >
          {data.linkText == "" ? "Перейти по ссылке" : data.linkText}
        </Button>
        <Typography color="text.secondary">{data.date}</Typography>
      </Box>
      <Divider />
      <Stack
        direction={{ xs: "column", md: "row" }}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={0}
      >
        <Typography sx={{ p: { xs: 2, md: 4 } }}>{data.description}</Typography>
        <Tags data={data} />
      </Stack>
      <Divider />
      <List disablePadding sx={{ pb: 2 }}>
        <ListItem sx={{ p: { xs: 2, md: 4 }, pt: { xs: 1.5, md: 4 } }}>
          <Typography variant="h3">Другие материалы:</Typography>
        </ListItem>
        {data.recommendation.length == 0 ? (
          <ListItem sx={{ p: { xs: 2, md: 4 } }}>
            <ListItemText primary={"Ничего не найдено :("}></ListItemText>
          </ListItem>
        ) : (
          data.recommendation.map((item, i) => (
            <>
              <ListItem
                key={i}
                item
                sx={{ p: { xs: 2, md: 4 }, gap: 2 }}
                component={RouterLink}
                to={`/material/${item.id}`}
              >
                <Typography variant="h5">{item.name}</Typography>
                <ListItemIcon sx={{ minWidth: "unset" }}>
                  <ArrowOutwardOutlinedIcon />
                </ListItemIcon>
              </ListItem>
              <Divider />
            </>
          ))
        )}
      </List>
    </>
  );
};

export default MaterialDetail;
