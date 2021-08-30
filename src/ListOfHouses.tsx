// @ts-nocheck

import { useState, useEffect } from "react";
// import ListItem from "./ListItem";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "./list-of-houses-style.css";

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

const optionRegions = [
  { value: "", label: "🗺 In all regions" },
  { value: "The Crownlands", label: "👑 The Crownlands" },
  { value: "The North", label: "🐺 The North" },
  { value: "The Vale", label: "🦅 The Vale" },
  { value: "The Riverlands", label: "🐟 The Riverlands" },
  { value: "Iron Islands", label: "🐙 Iron Islands" },
  { value: "The Westerlands", label: "🐻 The Westerlands" },
  { value: "The Reach", label: "🌼 The Reach" },
  { value: "The Stormlands", label: "🦌 The Stormlands" },
  { value: "Dorne", label: "🔆 Dorne" },
];

const optionProperties = [
  {
    value: "hasWords",
    label: "🎤Has words",
  },
  { value: "hasTitles", label: "🔖Has title" },
  {
    value: "hasSeats",
    label: "🪑Has seats",
  },
  {
    value: "hasDiedOut",
    label: "😵Has died out",
  },
  {
    value: "hasAncestralWeapons",
    label: "🪓Has Ancestral Weapons",
  },
];

const optionPageSize = [
  {
    value: "10",
    label: "10",
  },
  { value: "20", label: "20" },
  {
    value: "30",
    label: "30",
  },
  {
    value: "40",
    label: "40",
  },
  {
    value: "50",
    label: "50",
  },
];

const ListOfHouses = (props: any) => {
  const [houses, setHouses] = useState([]);
  const [region, setRegion] = useState({});
  const [hasWords, setHasWords] = useState(false);
  const [hasTitles, setHasTitles] = useState(false);
  const [hasSeats, setHasSeats] = useState(false);
  const [hasDiedOut, setHasDiedOut] = useState(false);
  const [hasAncestralWeapons, setHasAncestralWeapons] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [hasOptionProperties, setOptionProperties] = useState([]);
  // const [houseInput, setHouseInput] = useState("");

  useEffect(() => {
    const set = new Set(hasOptionProperties.map((x) => x.value));
    setHasWords(set.has("hasWords"));
    setHasTitles(set.has("hasTitles"));
    setHasSeats(set.has("hasSeats"));
    setHasDiedOut(set.has("hasDiedOut"));
    setHasAncestralWeapons(set.has("hasAncestralWeapons"));
  }, [hasOptionProperties]);

  return (
    <div className="container">
      <div className="select-bar">
        {/* <input
            type="text"
            placeholder="Search name / region / words/... "
            aria-label="Search name / region / words/..."
          /> */}
        <form
          id="search-form"
          action=""
          onSubmit={(e) => {
            e.preventDefault();

            const params = new URLSearchParams(
              Object.fromEntries(
                [
                  ["region", region.value ?? ""],
                  ["hasWords", hasWords],
                  ["hasTitles", hasTitles],
                  ["hasSeats", hasSeats],
                  ["hasDiedOut", hasDiedOut],
                  ["hasAncestralWeapons", hasAncestralWeapons],
                  ["pageSize", pageSize.value ?? ""],
                ].filter(([, v]) => Boolean(v))
              )
            );

            fetch(`https://anapioficeandfire.com/api/houses?${params}`)
              .then((x) => x.json())
              .then((rsp) => setHouses(rsp));
          }}
        >
          <Select
            theme={customTheme}
            options={optionRegions}
            onChange={setRegion}
            placeholder="Select a region"
            isSearchable
            className="select-region"
          />
          <Select
            components={makeAnimated()}
            theme={customTheme}
            options={optionProperties}
            onChange={setOptionProperties}
            placeholder="Select properties"
            isMulti
            noOptionsMessage={() => "no other properties 😅"}
            autoFocus
            isSearchable
            className="select-properties"
          />

          <Select
            theme={customTheme}
            options={optionPageSize}
            onChange={setPageSize}
            placeholder="Result per page"
            isSearchable
            className="select-page-size"
          />

          {/* <input
              type="text"
              placeholder="Search words"
              aria-label="Search words"
              onChange={(e) => setWordsInput(e.target.value)}
              value={wordsInput}
            /> */}
          <div>
            <button type="submit" id="search-btn">
              Search
            </button>
          </div>
        </form>
      </div>
      <h1>houses</h1>
      <pre>{JSON.stringify(houses, null, 2)}</pre>
      {/* <h3>route props</h3>
        <pre>{JSON.stringify(props, null, 2)}</pre> */}
    </div>
  );
};

export default ListOfHouses;
