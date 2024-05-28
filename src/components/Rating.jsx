import { Rating as MuiRating, Stack, Typography } from "@mui/material";
import { useAddRatingMutation } from "../redux/okBaseApi";

const Rating = ({ value, readOnly, materialDetailId }) => {
  const [addRating] = useAddRatingMutation();
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography component="legend" color="text.secondary">
        {value ? value : "0"}/5
      </Typography>
      <MuiRating
        readOnly={readOnly}
        name="half-rating"
        defaultValue={value ? Number(value) : 0}
        onChange={(event, newValue) => {
          addRating({ id: materialDetailId, score: newValue });
        }}
      />
    </Stack>
  );
};

export default Rating;
