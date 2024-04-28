import React from "react";
import { ModalComponent } from "@/components/Elements/Modal";
import { Button } from "@mui/material";
import { ReviewFormComponent } from "./ReviewForm.component";

export const CreateReviewComponent = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ModalButton = () => {
    return (
      <Button variant="outlined" onClick={handleOpen}>
        Write a review
      </Button>
    );
  };

  return (
    <>
      <ModalComponent
        open={open}
        handleClose={handleClose}
        ModalButton={<ModalButton />}
      >
        <ReviewFormComponent closeModal={handleClose} />
      </ModalComponent>
    </>
  );
};
