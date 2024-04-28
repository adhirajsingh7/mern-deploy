import React from "react";
import {
  Box,
  LinearProgress,
  Paper,
  Rating,
  Stack,
  Typography,
  linearProgressClasses,
  styled,
} from "@mui/material";
import { ratingCalculator } from "@/lib/util";

export const ReviewStatsComponent = (props: any) => {
  const { all_reviews, total } = props;
  const { rating1, rating2, rating3, rating4, rating5, averageRating } =
    ratingCalculator(all_reviews, total);

  const CustomLinearProgress = styled(LinearProgress)(() => ({
    height: 15,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#f6f8ff",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#f9ce50",
    },
  }));

  return (
    <Stack
      direction="column"
      gap={2}
      sx={{ m: 4, p: 4, width: "400px" }}
      component={Paper}
      elevation={2}
    >
      <Typography variant="h5" fontWeight={600} textAlign="center">
        Customer Reviews
      </Typography>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Stack
          direction="row"
          sx={{ p: 2, borderRadius: 10, bgcolor: "#f6f8ff" }}
          gap={1}
        >
          <Rating
            name="read-only"
            value={averageRating}
            precision={0.25}
            readOnly
          />
          <Typography variant="body1">
            {averageRating.toFixed(1)} out of 5
          </Typography>
        </Stack>
        <Typography variant="caption">{total} customer ratings</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body1">5 star</Typography>
        <Box sx={{ width: "80%" }}>
          <CustomLinearProgress
            variant="determinate"
            value={(rating5 / total) * 100 || 0}
          />
        </Box>
        <Typography variant="body1">{rating5}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body1">4 star</Typography>
        <Box sx={{ width: "80%" }}>
          <CustomLinearProgress
            variant="determinate"
            value={(rating4 / total) * 100 || 0}
          />
        </Box>
        <Typography variant="body1">{rating4}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body1">3 star</Typography>
        <Box sx={{ width: "80%" }}>
          <CustomLinearProgress
            variant="determinate"
            value={(rating3 / total) * 100 || 0}
          />
        </Box>
        <Typography variant="body1">{rating3}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body1">2 star</Typography>
        <Box sx={{ width: "80%" }}>
          <CustomLinearProgress
            variant="determinate"
            value={(rating2 / total) * 100 || 0}
          />
        </Box>
        <Typography variant="body1">{rating2}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body1">1 star</Typography>
        <Box sx={{ width: "80%" }}>
          <CustomLinearProgress
            variant="determinate"
            value={(rating1 / total) * 100 || 0}
          />
        </Box>
        <Typography variant="body1">{rating1}</Typography>
      </Stack>
    </Stack>
  );
};
