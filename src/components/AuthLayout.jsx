import { Outlet } from "react-router-dom";
import { Container, Stack, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const AuthLayout = () => {
  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component="main"
        sx={{
          width: "100%",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">OK-Base</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "552px",
            gap: 6,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};

export default AuthLayout;
