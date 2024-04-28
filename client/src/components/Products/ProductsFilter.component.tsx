import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export const ProductsFilterComponent = (props: any) => {
  const { setCategories, setPage } = props;

  const [state, setState] = useState({
    food: false,
    electronics: false,
    furniture: false,
    clothing: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setCategories((prev: string[]) => [...prev, event.target.name]);
    } else {
      setCategories((prev: string[]) =>
        prev.filter((category) => category !== event.target.name)
      );
    }
    setPage(0);
  };
  const { food, electronics, furniture, clothing } = state;

  return (
    <>
      <Stack direction="column" gap={2}>
        <Typography variant="h4" textAlign="center">
          Filters
        </Typography>
        <Typography variant="h6">categories</Typography>
        <Stack
          direction="column"
          gap={1}
          justifyContent="center"
          alignItems="center"
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  checked={food}
                  onChange={handleChange}
                  name="food"
                />
              }
              label="Food and Beverage"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  checked={electronics}
                  onChange={handleChange}
                  name="electronics"
                />
              }
              label="Consumer Electronics"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  checked={furniture}
                  onChange={handleChange}
                  name="furniture"
                />
              }
              label="Furniture and Decor"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  checked={clothing}
                  onChange={handleChange}
                  name="clothing"
                />
              }
              label="Apparel and Accessories"
            />
          </FormGroup>
        </Stack>
      </Stack>
    </>
  );
};
