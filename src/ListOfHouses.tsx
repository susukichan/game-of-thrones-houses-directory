// @ts-nocheck

import { useState, useEffect } from "react";

const ListOfHouses = (props: any) => {
  const [houses, setHouses] = useState([]);

  const [regionInput, setRegionInput] = useState("");
  const [wordsInput, setWordsInput] = useState("");

  useEffect(() => {
    const params = new URLSearchParams({
      region: "The Westerlands",
      hasTitles: String(true),
      hasAncestralWeapons: String(true),
    });

    fetch(`https://anapioficeandfire.com/api/houses?${params}`)
      .then((x) => x.json())
      .then((rsp) => setHouses(rsp));
  }, []);

  return (
    <div>
      <div>
        <div>
          <form
            id="search-form"
            action=""
            onSubmit={(e) => {
              e.preventDefault();

              const params = new URLSearchParams({
                region: regionInput,
                // hasTitles: String(true),
                // hasAncestralWeapons: String(true),
              });

              fetch(`https://anapioficeandfire.com/api/houses?${params}`)
                .then((x) => x.json())
                .then((rsp) => setHouses(rsp));
            }}
          >
            <input
              type="text"
              placeholder="Search name / region / words/... "
              aria-label="Search name / region / words/..."
            />
            <select onChange={(e) => setRegionInput(e.target.value)}>
              <option value="The Westerlands">The Westerlands</option>
              <option value="The Stormlands">The Stormlands</option>
            </select>
            <input
              type="text"
              placeholder="Search words"
              aria-label="Search words"
              onChange={(e) => setWordsInput(e.target.value)}
              value={wordsInput}
            />
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
