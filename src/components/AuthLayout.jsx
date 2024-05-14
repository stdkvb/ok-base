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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
            maxWidth: "450px",
            minHeight: "450px",
            gap: 2,
            alignItems: { xs: "center", sm: "flex-start" },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};

export default AuthLayout;
