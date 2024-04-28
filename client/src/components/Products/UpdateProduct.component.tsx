import React from "react";
import { ModalComponent } from "@/components/Elements/Modal";
import { IconButton } from "@mui/material";
import { ProductForm } from "./ProductForm.component";
import EditIcon from "@mui/icons-material/Edit";

export const UpdateProduct = (props: any) => {
  const { product, setSearch, setPage } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ModalButton = () => {
    return (
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>
    );
  };

  return (
    <>
      <ModalComponent
        open={open}
        handleClose={handleClose}
        ModalButton={<ModalButton />}
      >
        <ProductForm
          product={product}
          setSearch={setSearch}
          setPage={setPage}
          closeModal={handleClose}
        />
      </ModalComponent>
    </>
  );
};
