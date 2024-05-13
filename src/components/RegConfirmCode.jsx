import { Typography, Link } from "@mui/material";

import { useRegRepeatCodeMutation } from "../redux/okBaseApi";

const RegConfirmCode = ({ userId }) => {
  //query
  const [repeatCode, { error, isSuccess }] = useRegRepeatCodeMutation();

  return (
    <>
      <Typography>
        На указанную электронную почту направлено письмо, для подтверждения
        регистрации, пожалуйста, пройдите по ссылке в письме.
      </Typography>
      <Typography color="text.secondary">
        Письмо не пришло?{" "}
        <Link color="primary.main" onClick={() => repeatCode(userId)}>
          Отправить еще раз
        </Link>
      </Typography>
      {isSuccess && (
        <Typography color="success.main">
          Письмо повторно отправлено на указанную электронную почту
        </Typography>
      )}
      {error && <Typography color="error">{error.data.message}</Typography>}
    </>
  );
};

export default RegConfirmCode;
