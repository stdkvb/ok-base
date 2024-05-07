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
import {
  Outlet,
  Link as RouterLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useGetDetailPageQuery } from "../redux/okBaseApi";

const DetailPage = () => {
  //get detail page id
  let { detailPageId } = useParams();

  //get data
  const { data, isLoading } = useGetDetailPageQuery(detailPageId);
  console.log(data);
  //render
  if (isLoading) return <Typography>Загрузка..</Typography>;
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
          px: { xs: 2, md: 4 },
          pb: 2,
        }}
      >
        <Typography color="text.secondary">{data.date}</Typography>
        <Button
          variant="contained"
          component="a"
          href={data.link}
          target="_blank"
          color="primary"
        >
          {data.linkText == "" ? "Перейти по ссылке" : data.linkText}
        </Button>
      </Box>
      <Divider />
      <Stack
        direction={{ xs: "column", md: "row" }}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ px: { xs: 2, md: 4 } }}
      >
        <Typography sx={{ py: 2 }}>{data.description}</Typography>
        <Box
          sx={{
            flexGrow: "1",
            display: "flex",
            gap: 1,
            minWidth: "30%",
            height: "fit-content",
            alignItems: "flex-start",
            flexWrap: "wrap",
            py: 2,
          }}
        >
          {data.tags.map((tag, i) => (
            <Chip key={i} label={tag} />
          ))}
        </Box>
      </Stack>
      <Divider />
      <List disablePadding sx={{ pb: 2 }}>
        <ListItem sx={{ px: 4, py: 2 }}>
          <ListItemText
            primary={<Typography variant="h5">Похожие материалы:</Typography>}
          ></ListItemText>
        </ListItem>

        {data.recommendation.length == 0 ? (
          <ListItem sx={{ px: 4 }}>
            <ListItemText primary={"Ничего не найдено :("}></ListItemText>
          </ListItem>
        ) : (
          data.recommendation.map((item, i) => (
            <>
              <ListItem
                key={i}
                item
                sx={{ px: 4, gap: 2 }}
                component={RouterLink}
                to={`/${item.id}`}
              >
                <ListItemText
                  primary={<Typography variant="h5">{item.name}</Typography>}
                />
                <ListItemIcon>
                  <ArrowOutwardOutlinedIcon />
                </ListItemIcon>
              </ListItem>
            </>
          ))
        )}
      </List>
    </>
  );
};

export default DetailPage;
