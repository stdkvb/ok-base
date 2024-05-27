import { Typography, Divider, Box } from "@mui/material";

import { useGetAboutQuery } from "../redux/okBaseApi";
import config from "../config";

const About = () => {
  //get data
  const { data, isLoading, error } = useGetAboutQuery();

  if (isLoading) return;
  if (error)
    return (
      <Typography
        color="error"
        sx={{
          width: "100%",
          textAlign: "center",
          py: { xs: 2, md: 8 },
          px: { xs: 2, md: 4 },
        }}
      >
        {error.data.message}
      </Typography>
    );
  return (
    <>
      <Box
        sx={{
          py: { xs: 2, md: 8 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Typography variant="h2" component="h1">
          {" "}
          {data.name}
        </Typography>

        <Typography variant="span" color="text.secondary">
          v.{config.appVersion}
        </Typography>
      </Box>

      <Divider />
      <Box
        sx={{
          p: { xs: 2, md: 4 },
        }}
        dangerouslySetInnerHTML={{
          __html: data.description,
        }}
      ></Box>
    </>
  );
};

export default About;
