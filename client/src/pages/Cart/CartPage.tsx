import React from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateCart } from "@/features/cart/api/updateCart";
import { useEmptyCart } from "@/features/cart/api/emptyCart";
import { CartCheckoutComponent } from "@/components/Cart/CartCheckout.component";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage = () => {
  const navigate = useNavigate();
  const userCart = useOutletContext();

  const { mutate } = useUpdateCart(userCart?._id);
  const { mutate: emptyCartMutation } = useEmptyCart(userCart?._id);

  const handleIncreaseQuantity = (product) => {
    if (product.product.stock > product.quantity) {
      const updatedProduct = {
        product: product.product._id,
        quantity: product.quantity + 1,
        total_price: product.product.price * (product.quantity + 1),
      };
      mutate(updatedProduct);
    } else {
      toast.info("Quantity limit reached");
    }
  };

  const handleDecreaseQuantity = (product) => {
    const updatedProduct = {
      product: product.product._id,
      quantity: product.quantity - 1,
      total_price: product.product.price * (product.quantity - 1),
    };
    mutate(updatedProduct);
  };

  const handleRemoveProduct = (product) => {
    const updatedProduct = {
      product: product.product._id,
      quantity: 0,
      total_price: product.product.price * (product.quantity - 1),
    };
    mutate(updatedProduct);
  };

  const handleEmptyCart = () => {
    emptyCartMutation();
  };

  const handleProductNavigation = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Box sx={{ height: "calc(100vh - 64px)", width: 1 }}>
      <Typography variant="h4" textAlign="center" sx={{ p: 2 }}>
        Cart
      </Typography>
      {userCart?.products.length > 0 ? (
        <>
          <Stack direction="row" justifyContent="flex-end" sx={{ mr: 4 }}>
            <Button color="secondary" variant="contained" onClick={handleEmptyCart}>
              Empty cart
            </Button>
          </Stack>
          <Stack direction="row" justifyContent="space-around" sx={{ mt: 4 }}>
            <Stack direction="column" gap={3}>
              {userCart.products.map((product, index) => (
                <Stack
                  alignItems="center"
                  justifyContent="space-around"
                  key={index}
                  direction="row"
                  gap={3}
                  component={Paper}
                  elevation={2}
                  sx={{
                    p: 2,
                    minWidth: "600px",
                  }}
                >
                  <Box
                    sx={{ "&:hover": { cursor: "pointer" } }}
                    onClick={() => handleProductNavigation(product.product._id)}
                  >
                    <img
                      src={product.product?.image}
                      alt=""
                      style={{
                        height: "100px",
                        width: "100px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </Box>
                  <Stack direction="column" gap={2} alignItems="flex-start">
                    <Typography variant="h5" fontWeight={600}>
                      {product.product?.name}
                    </Typography>
                    <Chip
                      label={product.product?.category}
                      color="success"
                      sx={{ width: "fit-content" }}
                    />
                  </Stack>
                  <Stack
                    direction="column"
                    gap={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography>Quantity</Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      gap={1}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleIncreaseQuantity(product)}
                      >
                        <AddIcon />
                      </IconButton>
                      <Typography variant="body1" fontWeight={600}>
                        {product?.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleDecreaseQuantity(product)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Stack
                    direction="column"
                    gap={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography>Price</Typography>

                    <Typography variant="body1" fontWeight={600}>
                      ${product?.quantity * product.product?.price}
                    </Typography>
                  </Stack>

                  <IconButton
                    size="small"
                    onClick={() => handleRemoveProduct(product)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              ))}
            </Stack>
            <CartCheckoutComponent {...userCart} />
          </Stack>
        </>
      ) : (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "calc(100vh - 64px - 72px)" }}
        >
          <Typography variant="h4">No item in cart</Typography>
        </Stack>
      )}
    </Box>
  );
};

export default CartPage;
