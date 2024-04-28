import React from "react";
import { Avatar, Box, Paper, Rating, Stack, Typography } from "@mui/material";
import { useUserStore } from "@/store/store";
import { DeleteReview } from "./DeleteReview.component";
import { UpdateReview } from "./UpdateReview.component";

export const ReviewCard = (props: any) => {
  const { review, setPage } = props;
  const { _id: reviewId, title, content, rating, user_id, created_at } = review;
  const user = useUserStore((state) => state.user);

  return (
    <Stack
      className="review-card"
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      component={Paper}
      elevation={2}
      sx={{
        height: "auto",
        width: "400px",
        p: 2,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.1)",
          boxShadow: "3px 3px 10px 3px #dddddd",
        },
      }}
    >
      <Avatar>{user_id?.full_name.toUpperCase().charAt(0)}</Avatar>
      <Stack direction="column">
        <Stack direction="row" gap={2} alignItems="center">
          <Rating name="product-rating" value={rating} readOnly />
          <Typography variant="subtitle1" fontWeight={800}>
            {title}
          </Typography>
          {user && user?._id === user_id?._id ? (
            <Stack direction="row">
              <UpdateReview {...review} />
              <DeleteReview reviewId={reviewId} setPage={setPage} />
            </Stack>
          ) : null}
        </Stack>
        <Box
          sx={{
            maxWidth: "300px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {content}
        </Box>
        <Typography variant="caption" textAlign="right">
          {new Date(created_at).toDateString()}
        </Typography>
      </Stack>
    </Stack>
  );
};
