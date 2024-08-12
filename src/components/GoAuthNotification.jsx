import { Typography, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const GoAuthNotification = (
  <Typography>
    Необходимо{" "}
    <Link component={RouterLink} to="/log-in" color="primary.main">
      авторизоваться
    </Link>{" "}
  </Typography>
);

export default GoAuthNotification;
