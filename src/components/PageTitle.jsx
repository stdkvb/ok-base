import { useSelector } from "react-redux";
import { Typography, Divider } from "@mui/material";

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
