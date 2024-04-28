import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

export const ConfirmationDialog = (props: any) => {
  const {
    title,
    body,
    open,
    DeleteButton,
    handleDelete,
    handleClose,
    noText,
    yesText,
    isPending,
  } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <React.Fragment>
      {DeleteButton}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& > .MuiBackdrop-root": {
            backdropFilter: "blur(4px)",
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{body}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="inherit" onClick={handleClose}>
            {noText}
          </Button>
          <LoadingButton
            loading={isPending}
            loadingPosition="center"
            onClick={handleDelete}
          >
            <span>{yesText}</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
