import React from "react";
import { Skeleton, Stack } from "@mui/material";

export const ProductsLoading = () => {
  const SkeletonCard = () => (
    <Stack
      direction="column"
      sx={{
        height: "350px",
        width: "300px",
      }}
    >
      <Skeleton variant="rounded" height="50%" />
      <Stack direction="column" sx={{ p: 2 }} gap={1}>
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} width="60%" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="30%" />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Skeleton variant="text" sx={{ fontSize: "3rem" }} width="40%" />
          <Skeleton variant="rounded" height="36px" width="100px" />
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <>
      <Stack direction="row" flexWrap="wrap" gap={3} p={2}>
        {Array(5)
          .fill(1)
          .map((item, index) => (
            <SkeletonCard key={index} />
          ))}
      </Stack>
    </>
  );
};
