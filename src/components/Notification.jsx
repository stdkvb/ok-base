import { forwardRef, useState, useImperativeHandle, useEffect } from "react";
import { Snackbar, SnackbarContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Notification = forwardRef((props, ref) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const [queue, setQueue] = useState([]);
  const [processing, setProcessing] = useState(false);

  useImperativeHandle(ref, () => ({
    openNotification: (message) => {
      setQueue((prevQueue) => [...prevQueue, message]);
    },
  }));

  useEffect(() => {
    if (!processing && queue.length > 0) {
      setProcessing(true);
      setMessage(queue[0]);
      setQueue((prevQueue) => prevQueue.slice(1));
      setOpenSnackBar(true);
    }
  }, [processing, queue]);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
    setTimeout(() => {
      setProcessing(false);
    }, 500);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={openSnackBar}
      onClose={handleCloseSnackBar}
      autoHideDuration={1000}
    >
      <SnackbarContent
        message={message}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackBar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Snackbar>
  );
});

export default Notification;
