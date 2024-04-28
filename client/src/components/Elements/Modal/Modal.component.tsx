import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

interface ModalPropTypes {
  open: boolean;
  handleClose: () => void;
  ModalButton: React.ReactNode;
  children: React.ReactNode;
}

export const ModalComponent = (props: ModalPropTypes) => {
  const { open, handleClose, ModalButton, children } = props;

  return (
    <>
      {ModalButton}
      <Modal
        sx={{
          "& > .MuiBackdrop-root": {
            backdropFilter: "blur(4px)",
          },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </>
  );
};
