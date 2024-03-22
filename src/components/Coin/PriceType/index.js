import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
export default function PriceType({priceType, handleChangePriceType}) {

 

  return (
    <ToggleButtonGroup
      color="primary"
      value={priceType}
      exclusive
      onChange={handleChangePriceType}
      aria-label="Platform"
      sx={{
        "&.Mui-selected": {
          color: "var(--blue) !important",
        },
        borderColor: "var(--blue)",
        border: "unset !important",
        "& .MuiToggleButtonGroup-grouped": {
          border: "1px solid var(--blue)!important",
          borderColor: "unset",
          color: "var(--blue) !important ",
        },
        "& .MuiToggleButton-standard": {
          color: "var(--blue) !important",
        },
      }}
    >
      <ToggleButton value="price">Price</ToggleButton>
      <ToggleButton value="marketcap">Market Cap</ToggleButton>
      <ToggleButton value="volume">Volume</ToggleButton>
      <ToggleButton value="predict">Predict</ToggleButton>

    </ToggleButtonGroup>
  );
}
