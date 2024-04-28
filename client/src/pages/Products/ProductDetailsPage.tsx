import React from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import {
  Button,
  Chip,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useGetProductById } from "@/features/products/api/getProductById";
import { ReviewsComponent } from "@/components/Reviews";
import { useAddToCart } from "@/features/cart/api/addToCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useUserStore } from "@/store/store";
import { toast } from "react-toastify";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userCart = useOutletContext();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  let productInCart = false;
  userCart?.products.forEach((product) => {
    if (product.product._id === params.product_id) {
      productInCart = true;
    }
  });

  const { isPending, data: product } = useGetProductById(params.product_id);
  const { mutate } = useAddToCart();

  // if (isPending) return <Loading />;

  const handleAddToCart = () => {
    if (!isLoggedIn) return toast.warning("You need to sign in!");

    const updatedProduct = {
      product: product._id,
      quantity: 1,
      total_price: product.price,
    };
    mutate(updatedProduct);
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) return toast.warning("You need to sign in!");

    const updatedProduct = {
      product: product._id,
      quantity: 1,
      total_price: product.price,
    };
    mutate(updatedProduct);
    navigate("/cart");
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={8}
        sx={{ height: "calc(100vh- 64px)", width: 1, p: 2 }}
      >
        {isPending ? (
          <Skeleton variant="rounded" height="600px" width="600px" />
        ) : (
          <img
            src={product?.image}
            alt=""
            style={{
              height: "600px",
              width: "600px",
              objectFit: "contain",
              borderRadius: "10%",
              backgroundColor: "#f5f6f6",
            }}
          />
        )}
        <Stack direction="column" gap={2} sx={{ p: 2, width: 1 / 2 }}>
          <Typography variant="h2">
            {isPending ? <Skeleton /> : product?.name}
          </Typography>
          <Typography variant="body1">
            {isPending ? <Skeleton /> : product?.description}
          </Typography>
          <Stack direction="column" gap={4}>
            <Divider />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-around"
            >
              <Typography variant="h4">
                {isPending ? <Skeleton width="80px" /> : "$ " + product?.price}
              </Typography>
              <Stack direction="row" gap={2}>
                {isPending ? (
                  <>
                    <Skeleton variant="rounded" height="30px" width="80px" />
                    <Skeleton variant="rounded" height="30px" width="80px" />
                  </>
                ) : (
                  <>
                    <Chip
                      label="Category"
                      variant="filled"
                      size="medium"
                      color="primary"
                    />
                    <Chip
                      label={product?.category}
                      variant="outlined"
                      size="medium"
                      color="primary"
                    />
                  </>
                )}
              </Stack>
              <Stack direction="row" gap={2}>
                {isPending ? (
                  <>
                    <Skeleton variant="rounded" height="30px" width="50px" />
                    <Skeleton variant="rounded" height="30px" width="50px" />
                  </>
                ) : (
                  <>
                    <Chip
                      label="Stock"
                      variant="filled"
                      size="medium"
                      color="success"
                    />
                    <Chip
                      label={product?.stock}
                      variant="outlined"
                      size="medium"
                      color="success"
                    />
                  </>
                )}
              </Stack>
            </Stack>
            <Divider />
          </Stack>
          {isPending ? (
            <Stack direction="row" gap={6}>
              <Skeleton variant="rounded" width="280px" height="60px" />
              <Skeleton variant="rounded" width="280px" height="60px" />
            </Stack>
          ) : product?.stock > 0 ? (
            <Stack direction="row" gap={6}>
              {productInCart ? (
                <Button
                  variant="outlined"
                  size="large"
                  color="secondary"
                  sx={{
                    "&.MuiButton-root": {
                      borderRadius: "30px",
                      width: "300px",
                      height: "60px",
                    },
                  }}
                  startIcon={<ShoppingCartOutlinedIcon />}
                  onClick={handleViewCart}
                >
                  View in Cart
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    sx={{
                      "&.MuiButton-root": {
                        borderRadius: "30px",
                        width: "300px",
                        height: "60px",
                      },
                    }}
                    onClick={handleBuyNow}
                  >
                    Buy now
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    color="secondary"
                    sx={{
                      "&.MuiButton-root": {
                        borderRadius: "30px",
                        width: "300px",
                        height: "60px",
                      },
                    }}
                    startIcon={<ShoppingCartOutlinedIcon />}
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </Button>
                </>
              )}
            </Stack>
          ) : (
            <Typography variant="h3" textAlign="center" color="error">
              Out of stock
            </Typography>
          )}
        </Stack>
      </Stack>
      {!isPending && <ReviewsComponent />}
    </>
  );
};

export default ProductDetailsPage;
