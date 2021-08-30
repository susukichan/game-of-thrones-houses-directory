// @ts-nocheck

import chroma from "chroma-js";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useState } from "react";

const optionToppings = [
  { value: "The North", label: "🤔 The North" },
  { value: "The Iron Islands", label: "🏄🏻‍♂️ The Iron Islands" },
  { value: "HasTitle=true", label: "🚵🏻 The Reach" },
  { value: "asdasd", label: "🚵🏻 sdfasdasdas" },
];

const optionSize = [
  { value: "6", label: "🤔 6" },
  { value: "64", label: "🏄🏻‍♂️ 64" },
  { value: "234", label: "🚵🏻 234" },
];

const Testing = () => {
  const [toppings, setToppings] = useState([]);
  const [size, setSize] = useState({});

  function customTheme(theme: any) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "orange",
        primary: "green",
      },
    };
  }

  console.log(toppings);
  return (
    <>
      <h1>select testing</h1>
      <div
        style={{
          width: "400px",
        }}
      >
        <Select
          components={makeAnimated()}
          theme={customTheme}
          options={optionToppings}
          onChange={setToppings}
          placeholder="select pizza toppings"
          isMulti
          noOptionsMessage={() => "no other pizza toppings "}
          autoFocus
          isSearchable
        />
        <Select
          theme={customTheme}
          options={optionSize}
          onChange={setSize}
          placeholder="select pizza size"
          isSearchable
        />
        {toppings.map((topping) => (
          <p>{topping.value}</p>
        ))}
        <p>{size.value}</p>
      </div>
    </>
  );
};

export default Testing;
