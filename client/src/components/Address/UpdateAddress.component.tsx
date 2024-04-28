import React from "react";
import { ModalComponent } from "@/components/Elements/Modal";
import { Button } from "@mui/material";
import { AddressFormComponent } from "./AddressForm.component";

export const UpdateAddress = (address: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ModalButton = () => {
    return (
      <Button sx={{ textTransform: "none" }} onClick={handleOpen}>
        Edit
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
        <AddressFormComponent address={address} closeModal={handleClose} />
      </ModalComponent>
    </>
  );
};