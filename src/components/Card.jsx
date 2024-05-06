import {
  Card as MuiCard,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";

import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";

import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";

const Card = ({ id, name, imageUrl }) => {
  return (
    <MuiCard
      sx={{
        borderRadius: 3,
        minHeight: "100%",
      }}
    >
      {imageUrl ? (
        <CardMedia component="img" height="100%" image={imageUrl} alt="image" />
      ) : (
        <Box
          sx={{
            width: "100%",
            minHeight: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageNotSupportedOutlinedIcon />
        </Box>
      )}

      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          component={RouterLink}
          to="/"
        >
          {name}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
