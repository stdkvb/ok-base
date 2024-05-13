import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import { useRegCheckCodeMutation } from "../redux/okBaseApi";

const SignUpFinish = () => {
  const [urlData, setUrlData] = useSearchParams();

  //confirmation query
  const [regCheckCode, { error, isSuccess, isLoading }] =
    useRegCheckCodeMutation();
  useEffect(() => {
    regCheckCode(urlData.get("userId"), urlData.get("confirmCode"));
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.data.message}</Typography>;
  if (isSuccess) return;
};

export default SignUpFinish;
