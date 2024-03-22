import * as React from "react";
import "./style.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
export default function SelectDays({ days, handleChangeSelectDays }) {
  return (
    <div className="select-days">
      <InputLabel
        id="demo-simple-select-label"
        style={{ color: "var(--white) " }}
      >
        Price Change on the last
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={days}
        label="Day"
        onChange={handleChangeSelectDays}
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
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={30}>30</MenuItem>
        <MenuItem value={60}>60</MenuItem>
        <MenuItem value={90}>90</MenuItem>
        <MenuItem value={360}>365</MenuItem>
      </Select>
    </div>
  );
}
