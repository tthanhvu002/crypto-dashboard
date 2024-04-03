import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
export default function SelectSortReverse({
  sortReverse,
  handleChangeSortReverse,
}) {
  return (
    <div className="select-days">
      <InputLabel
        id="demo-simple-select-label"
        style={{ color: "var(--white) " }}
      ></InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sortReverse ? "lowest" : "highest"}
        label="Day"
        onChange={handleChangeSortReverse}
        sx={{
          height: "2.5rem",
          color: "var(--white)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--white)",
          },
          "& .MuiSvgIcon-root": {
            color: "var(--white)",
          },
          "&:hover": {
            "&& fieldset": {
              borderColor: "#3a80e9",
            },
          },
        }}
      >
        <MenuItem value={"highest"}>Low to high</MenuItem>
        <MenuItem value={"lowest"}>High to low</MenuItem>
      </Select>
    </div>
  );
}
