import React from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface ISearchProps {
  search: string;
  handleSearchChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleClearText: () => void;
}

export const SearchComponent = (props: ISearchProps) => {
  const { search, handleSearchChange, handleClearText } = props;
  return (
    <TextField
      sx={{ width: "300px" }}
      placeholder="Search by name"
      value={search}
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {search && (
              <IconButton onClick={handleClearText} edge="end">
                <ClearIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};
