import { Button, TextField, Box, Typography, Link } from "@mui/material";

import { useRecoveryPassStartMutation } from "../redux/okBaseApi";

const RecoveryPassConfirmCode = ({ email }) => {
  const [recoveryPassStart, { error, isSuccess }] =
    useRecoveryPassStartMutation();
  return (
    <>
      <Typography>
        На указанную электронную почту направлено письмо, для восстановления
        пароля, пожалуйста, пройдите по ссылке в письме.
      </Typography>
      <Typography color="text.secondary">
        Письмо не пришло?{" "}
        <Link
          color="primary.main"
          onClick={() => recoveryPassStart(email).unwrap()}
        >
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

export default RecoveryPassConfirmCode;
