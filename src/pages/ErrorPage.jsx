import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

const ErrorPage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 2,
        alignItems: "center",
        my: "auto",
        mx: 0,
      }}
    >
      <Typography variant="h2" component="h1">
        Ошибка 404
      </Typography>
      <Typography>Страница не найдена</Typography>
      <Button variant="contained" component={RouterLink} to="/">
        На главную
      </Button>
    </Container>
  );
};

export default ErrorPage;
