import React, { useState } from "react";
import Button from "@mui/material/Button";
import { SelectAddressComponent } from "./Checkout components/SelectAddress.component";
import { ModalComponent } from "@/components/Elements/Modal";

export const CheckoutModalComponent = (props: any) => {
  const { amount, cartId } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ModalButton = () => {
    return (
      <Button variant="outlined" sx={{ width: "200px" }} onClick={handleOpen}>
        Checkout
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
        <SelectAddressComponent
          closeModal={handleClose}
          amount={amount}
          cartId={cartId}
        />
      </ModalComponent>
    </>
  );
};
