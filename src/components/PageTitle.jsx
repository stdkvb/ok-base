import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Helmet } from "react-helmet";

import metaImage from "../assets/images/ok-base.jpg";

const PageTitle = () => {
  const filters = useSelector((state) => state.filtersSlice.filters);

  const renderTitle = () => {
    if (filters.category && !filters.tag) {
      return `${filters.category}`;
    } else if (filters.tag) {
      return `#${filters.tag}`;
    } else if (filters.search) {
      return `Результаты поиска по запросу: ${filters.search}`;
    } else if (filters.favorites) {
      return "Избранное";
    } else if (filters.my) {
      return "Мои материалы";
    }
    return null;
  };

  const title = renderTitle();

  return (
    <>
      <Helmet>
        <title>{title ? title : "OK-BASE"}</title>
        <meta name="title" content={title ? title : "OK-BASE"} />
        <meta
          name="description"
          content="Открытая база знаний для руководителей и менеджеров ИТ-проектов"
        />
        <meta name="apple-mobile-web-app-title" content="ok-base.ru" />
        <meta name="application-name" content="ok-base.ru" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content="Открытая база знаний для руководителей и менеджеров ИТ-проектов"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ok-base.ru" />
        <meta property="og:image" content={`https://ok-base.ru${metaImage}`} />
        <meta
          property="og:image:secure_url"
          content={`https://ok-base.ru${metaImage}`}
        />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
      </Helmet>
      {title && (
        <>
          <Typography
            component="h1"
            variant="h2"
            sx={{
              py: { xs: 2, md: 8 },
              px: { xs: 2, md: 4 },
            }}
          >
            {title}
          </Typography>
        </>
      )}
    </>
  );
};

export default PageTitle;
