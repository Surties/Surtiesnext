"use client";
import { Select } from "@chakra-ui/react";

function Filtering({ onFilter, cata }) {
  const handleChange = (e) => {
    onFilter(e.target.value);
  };
  return (
    <Select
      onChange={handleChange}
      focusBorderColor="#d91e26"
      placeholder="Select a category"
    >
      {cata.map((el) => {
        return (
          <option key={el} value={el}>
            <h1 styles={{ textDecoration: "capitalize" }}> {el}</h1>
          </option>
        );
      })}
    </Select>
  );
}

export default Filtering;
