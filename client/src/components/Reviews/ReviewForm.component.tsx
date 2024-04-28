import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { FormInputText } from "../Form/FormInputText";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { FormRating } from "../Form/FormRating";
import { useParams } from "react-router-dom";
import { useCreateReview } from "@/features/reviews/api/createReview";
import { TReviewSchema, reviewSchema } from "@/lib/type";
import { useUpdateReview } from "@/features/reviews/api/updateReview";

export const ReviewFormComponent = (props: any) => {
  const { closeModal, review } = props;
  const params = useParams();
  const productId = params?.product_id || "";

  const createReview = useCreateReview({ productId, closeModal });
  const updateReview = useUpdateReview({ reviewId: review?._id, closeModal });

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<TReviewSchema>({
    defaultValues: review
      ? review
      : {
          title: "",
          content: "",
          rating: 3,
        },
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (review) {
      updateReview.mutate(data);
    } else {
      createReview.mutate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap={2} sx={{ width: "400px" }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5" fontWeight={600}>
            {review ? "Edit review" : "Write a review"}
          </Typography>
        </Stack>
        <FormInputText
          type="text"
          name={"title"}
          control={control}
          label={"Title"}
        />
        <FormInputText
          type="text"
          name={"content"}
          control={control}
          label={"Review"}
          multiline={true}
          rows={4}
        />
        <FormRating name={"rating"} control={control} />
        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }} gap={2}>
          <Button variant="outlined" onClick={() => closeModal()}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            loading={createReview.isPending || updateReview.isPending}
            loadingPosition="center"
            variant="contained"
          >
            Post
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  );
};
