export const ratingCalculator = (reviews: any, total: number) => {
  let rating1 = 0;
  let rating2 = 0;
  let rating3 = 0;
  let rating4 = 0;
  let rating5 = 0;

  reviews?.map((rating: any) => {
    if (rating.rating === 1) rating1++;
    if (rating.rating === 2) rating2++;
    if (rating.rating === 3) rating3++;
    if (rating.rating === 4) rating4++;
    if (rating.rating === 5) rating5++;
  });
  
  const averageRating = (rating1*1 + rating2*2 +rating3*3 +rating4*4 + rating5*5)/total || 0;

  return { rating1, rating2, rating3, rating4, rating5, averageRating };
};
