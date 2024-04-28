import React, { useState } from "react";
import { Pagination, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { ReviewStatsComponent } from "./ReviewStats.component";
import { CreateReviewComponent } from "./CreateReview.component";
import { ReviewCard } from "./ReviewCard.component";
import { useGetReviews } from "@/features/reviews/api/getReviews";
import { useUserStore } from "@/store/store";

export const ReviewsComponent = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 2;
  const params = useParams();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const productId = params?.product_id || "";

  const { data: reviewsList } = useGetReviews({
    page,
    rowsPerPage,
    productId,
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };
  return (
    <>
      <Stack direction="row" justifyContent="space-around">
        <ReviewStatsComponent {...reviewsList} />
        <Stack
          direction="column"
          alignItems="center"
          gap={5}
          sx={{ width: 1 / 2 }}
        >
          <Stack
            direction="row"
            justifyContent="space-around"
            sx={{ width: 1 / 2 }}
          >
            <Typography variant="h4">Reviews</Typography>
            {isLoggedIn && <CreateReviewComponent />}
          </Stack>
          {reviewsList?.data?.map((review: any, index: number) => (
            <ReviewCard key={index} review={review} setPage={setPage} />
          ))}
          <Stack direction="row" justifyContent="center" sx={{ p: 4 }}>
            {reviewsList?.data?.length !== 0 ? (
              <Pagination
                color="secondary"
                count={reviewsList?.total_page}
                page={page + 1}
                onChange={handleChange}
              />
            ) : (
              <Typography sx={{ p: 2 }} variant="h4" textAlign="center">
                No Reviews found
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
