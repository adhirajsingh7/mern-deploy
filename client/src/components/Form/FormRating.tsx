import React from "react";
import { Rating } from "@mui/material";
import { Controller } from "react-hook-form";

export const FormRating = (props: FormRatingProps) => {
  const { name, control } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <Rating
          name="input-rating"
          value={parseInt(value)}
          onChange={onChange}
        />
      )}
    />
  );
};
