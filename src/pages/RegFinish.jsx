import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";

import { useRegCheckCodeMutation } from "../redux/okBaseApi";
import RegCreatePassword from "../components/RegCreatePassword";

const RegFinish = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let urlParams = Object.fromEntries(searchParams.entries());

  //confirmation query
  const [regCheckCode, { error, isSuccess, isLoading }] =
    useRegCheckCodeMutation();
  useEffect(() => {
    regCheckCode(urlParams);
  }, []);

  if (isLoading)
    return (
      <CircularProgress
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          margin: "auto",
        }}
      />
    );
  if (error)
    return (
      <Typography color="error" sx={{ width: "100%", textAlign: "center" }}>
        {error.data.message}
      </Typography>
    );
  if (isSuccess) return <RegCreatePassword urlParams={urlParams} />;
};

export default RegFinish;
