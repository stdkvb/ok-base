import { Toolbar, Typography, Link, Box } from "@mui/material";
import {
  useGetPrivacyPolicyQuery,
  useGetTermsUseQuery,
  useGetLegalInformationQuery,
} from "../redux/okBaseApi";

const Footer = () => {
  //get data
  const { data: legal, isLoading: legalLoading } =
    useGetLegalInformationQuery();
  const { data: privacy, isLoading: privacyLoading } =
    useGetPrivacyPolicyQuery();
  const { data: terms, isLoading: termsLoading } = useGetTermsUseQuery();
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
        <Typography>© 2024 OK-BASE</Typography>
        {!privacyLoading && (
          <Link href={legal.privacy} target="_blank" color="text.secondary">
            Политика конфиденциальности
          </Link>
        )}
        {!legalLoading && (
          <Link href={legal.file} target="_blank" color="text.secondary">
            Юридическая информация
          </Link>
        )}
        {!termsLoading && (
          <Link href={terms.file} target="_blank" color="text.secondary">
            Правила пользования
          </Link>
        )}
        <Link href="https://wptt.ru/" target="_blank">
          Разработка - Вебпространство
        </Link>
      </Box>
    </Toolbar>
  );
};

export default Footer;
