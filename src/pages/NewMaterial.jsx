import React from "react";

const NewMaterial = () => {
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          py: { xs: 2, md: 8 },
          px: { xs: 2, md: 4 },
        }}
      >
        Добавить материал
      </Typography>
      <Divider />
      <Stack
        direction={{ xs: "column", md: "row" }}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={0}
      >
        <Typography sx={{ p: { xs: 2, md: 4 } }}>{data.description}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: { xs: 2, md: 4 },
          }}
        >
          <Button
            variant="contained"
            component="a"
            href={data.link}
            target="_blank"
            color="primary"
          >
            {data.linkText == "" ? "Перейти по ссылке" : data.linkText}
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default NewMaterial;
