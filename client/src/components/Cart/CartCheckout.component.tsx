import React, { useEffect, useState } from "react";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import { CheckoutModalComponent } from "./CheckoutModal.component";

export const CartCheckoutComponent = (props: any) => {
  const { products, _id: cart_id } = props;
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    let total_amount = 0;
    products.map((product) => (total_amount += product.total_price));
    setAmount(total_amount);
  }, [products]);

  return (
    <Stack
      direction="column"
      gap={4}
      sx={{ p: 4, width: 1 / 4, height: "350px" }}
      component={Paper}
    >
      <Stack direction="column" gap={2}>
        <Typography variant="h5" fontWeight={600}>
          Summary
        </Typography>
        <Divider />
      </Stack>
      <Stack direction="column" gap={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1">Order Total</Typography>
          <Typography variant="body1">${amount}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1">Delivery Fees</Typography>
          <Typography variant="body1">Free</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ color: "purple" }}
        >
          <Typography variant="body1" fontWeight={600}>
            Subtotal
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            ${amount}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="center">
        <CheckoutModalComponent amount={amount} cartId={cart_id} />
      </Stack>
    </Stack>
  );
};
