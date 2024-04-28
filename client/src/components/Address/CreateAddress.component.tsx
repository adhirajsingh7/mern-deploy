import React from "react";
import { ModalComponent } from "@/components/Elements/Modal";
import { Button } from "@mui/material";
import { AddressFormComponent } from "./AddressForm.component";
import AddIcon from "@mui/icons-material/Add";

export const CreateAddress = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ModalButton = () => {
    return (
      <Button
        variant="outlined"
        sx={{ width: "200px" }}
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Add address
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
        <AddressFormComponent closeModal={handleClose} />
      </ModalComponent>
    </>
  );
};