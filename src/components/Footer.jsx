import { Toolbar, Typography, Link, Box } from "@mui/material";
import { useGetPrivacyPolicyQuery } from "../redux/okBaseApi";

const Footer = () => {
  //get data
  const { data, isLoading } = useGetPrivacyPolicyQuery();
  return (
    <Toolbar
      sx={{
        p: { xs: 2, md: 4 },
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 2,
      }}
      disableGutters={true}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "flex-end", lg: "space-between" },

          gap: { xs: 1, md: 3 },
        }}
      >
        <Typography fontSize="14px">© 2024 OK-BASE</Typography>
        {!isLoading &&
          data &&
          data.map((item, i) => (
            <Link
              key={i}
              href={item.file}
              target="_blank"
              color="text.secondary"
              fontSize="14px"
            >
              {item.name}
            </Link>
          ))}
        <Link href="https://wptt.ru/" target="_blank" fontSize="14px">
          Разработка - Вебпространство
        </Link>
      </Box>
    </Toolbar>
  );
};

export default Footer;
