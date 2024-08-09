// import { forwardRef, useState, useImperativeHandle, useEffect } from "react";
// import { Snackbar, SnackbarContent, IconButton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// const Notification = forwardRef((props, ref) => {
//   const [openSnackBar, setOpenSnackBar] = useState(false);
//   const [message, setMessage] = useState("");
//   const [queue, setQueue] = useState([]);
//   const [processing, setProcessing] = useState(false);

//   useImperativeHandle(ref, () => ({
//     openNotification: (message) => {
//       setQueue((prevQueue) => [...prevQueue, message]);
//     },
//   }));

//   useEffect(() => {
//     if (!processing && queue.length > 0) {
//       setProcessing(true);
//       setMessage(queue[0]);
//       setQueue((prevQueue) => prevQueue.slice(1));
//       setOpenSnackBar(true);
//     }
//   }, [processing, queue]);

//   const handleCloseSnackBar = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpenSnackBar(false);
//     setTimeout(() => {
//       setProcessing(false);
//     }, 500);
//   };

//   return (
//     <Snackbar
//       anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       open={openSnackBar}
//       onClose={handleCloseSnackBar}
//       autoHideDuration={1000}
//     >
//       <SnackbarContent
//         message={message}
//         action={
//           <IconButton
//             size="small"
//             aria-label="close"
//             color="inherit"
//             onClick={handleCloseSnackBar}
//           >
//             <CloseIcon fontSize="small" />
//           </IconButton>
//         }
//       />
//     </Snackbar>
//   );
// });

// export default Notification;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, SnackbarContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  removeNotification,
  setProcessing,
} from "../redux/slices/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notificationSlice.notifications
  );
  const processing = useSelector((state) => state.notificationSlice.processing);
  const message = notifications[0];

  useEffect(() => {
    if (!processing && notifications.length > 0) {
      dispatch(setProcessing(true));
    }
  }, [processing, notifications, dispatch]);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setProcessing(false));
    dispatch(removeNotification());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={processing}
      onClose={handleCloseSnackBar}
      autoHideDuration={1000}
    >
      <SnackbarContent
        message={<div>{message}</div>}
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
};

export default Notification;
