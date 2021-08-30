// @ts-nocheck

import { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

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

const ListOfHouses = (props: any) => {
  const [houses, setHouses] = useState([]);
  const [regionInput, setRegionInput] = useState({});
  const [hasWords, setHasWords] = useState(false);
  const [hasTitles, setHasTitles] = useState(false);
  const [hasSeats, setHasSeats] = useState(false);
  const [hasDiedOut, setHasDiedOut] = useState(false);
  const [hasAncestralWeapons, setHasAncestralWeapons] = useState(false);
  const [hasOptionProperties, setOptionProperties] = useState([]);
  const [houseInput, setHouseInput] = useState("");

  useEffect(() => {
    handleSelectedOptionProperties();
  }, [hasOptionProperties]);

  // useEffect(() => {
  //   const params = new URLSearchParams({
  //     region: "The Westerlands",
  //     name: "House Algood",
  //     hasTitles: String(true),
  //     hasAncestralWeapons: String(true),
  //   });

  //   fetch(`https://anapioficeandfire.com/api/houses?${params}`)
  //     .then((x) => x.json())
  //     .then((rsp) => setHouses(rsp));
  // }, []);

  const optionRegions = [
    { value: "", label: "🗺 In all regions" },
    { value: "The Crownlands", label: "👑 The Crownlands" },
    { value: "The North", label: "🐺 The North" },
    { value: "The Vale of Arryn", label: "🦅 The Vale of Arryn" },
    { value: "The Riverlands", label: "🐟 The Riverlands" },
    { value: "The Iron Islands", label: "🐙 The Iron Islands" },
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

  const handleSelectedOptionProperties = () => {
    let value = [];
    hasOptionProperties.forEach((x) => value.push(x.value));

    value.includes("hasWords") ? setHasWords(true) : setHasWords(false);

    value.includes("hasTitles") ? setHasTitles(true) : setHasTitles(false);

    value.includes("hasSeats") ? setHasSeats(true) : setHasSeats(false);

    value.includes("hasDiedOut") ? setHasDiedOut(true) : setHasDiedOut(false);

    value.includes("hasAncestralWeapons")
      ? setHasAncestralWeapons(true)
      : setHasAncestralWeapons(false);
  };

  return (
    <div>
      <div>
        <div>
          <input
            type="text"
            placeholder="Search name / region / words/... "
            aria-label="Search name / region / words/..."
          />
          <form
            id="search-form"
            action=""
            onSubmit={(e) => {
              e.preventDefault();

              handleSelectedOptionProperties();

              const params = new URLSearchParams({
                region: regionInput.value || "",
                name: houseInput,
                hasWords,
                hasTitles,
                hasSeats,
                hasDiedOut,
                hasAncestralWeapons,
              });

              fetch(`https://anapioficeandfire.com/api/houses?${params}`)
                .then((x) => x.json())
                .then((rsp) => setHouses(rsp));
            }}
          >
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
            />
            <Select
              theme={customTheme}
              options={optionRegions}
              onChange={setRegionInput}
              placeholder="Select a region"
              isSearchable
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
      </div>

      <h1>houses</h1>
      <pre>{JSON.stringify(houses, null, 2)}</pre>
      <h3>route props</h3>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

export default ListOfHouses;
