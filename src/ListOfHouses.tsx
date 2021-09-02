import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import { Loading } from "./components/Loading/Loading";
import { ListItem } from "./components/ListItem/ListItem";
import { House } from "./types";
import "./list-of-houses-style.css";

const customTheme = (theme: any) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary25: "orange",
      primary: "green",
    },
  };
};

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
  { value: "The Neck", label: "👔 The Neck" },
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
    value: 10,
    label: "10",
  },
  { value: 20, label: "20" },
  {
    value: 30,
    label: "30",
  },
  {
    value: 40,
    label: "40",
  },
  {
    value: 50,
    label: "50",
  },
];

export const ListOfHouses = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [houses, setHouses] = useState<Array<House>>([]);
  const [region, setRegion] = useState<{ value?: string }>({});
  const [hasWords, setHasWords] = useState(false);
  const [hasTitles, setHasTitles] = useState(false);
  const [hasSeats, setHasSeats] = useState(false);
  const [hasDiedOut, setHasDiedOut] = useState(false);
  const [hasAncestralWeapons, setHasAncestralWeapons] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [hasOptionProperties, setOptionProperties] = useState<
    Array<{ value: string }>
  >([]);
  const [linkHeader, setLinkHeader] = useState("");

  interface Parsed {
    prev?: { url: string };
    next: { url: string };
  }
  const [parsed, setParsed] = useState<null | Parsed>(null);

  useEffect(() => {
    const set = new Set(hasOptionProperties.map((x) => x.value));
    setHasWords(set.has("hasWords"));
    setHasTitles(set.has("hasTitles"));
    setHasSeats(set.has("hasSeats"));
    setHasDiedOut(set.has("hasDiedOut"));
    setHasAncestralWeapons(set.has("hasAncestralWeapons"));
  }, [hasOptionProperties]);

  useEffect(() => {
    var parse = require("parse-link-header");
    var parsed = parse(linkHeader);
    setParsed(parsed);
  }, [linkHeader]);

  useEffect(() => {}, [parsed]);

  const maybePrevUrl = parsed?.prev?.url;
  const maybeNextUrl = parsed?.next?.url;

  const fetchUrl = async (url: string) => {
    const rsp = await fetch(url);
    setHouses(await rsp.json());
    setLoading(false);
    setLinkHeader(rsp.headers.get("Link") ?? "");
  };

  return (
    <div className="list-of-houses container">
      <div className="select-bar">
        <form
          id="search-form"
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);

            const params = new URLSearchParams(
              Object.fromEntries(
                [
                  ["region", region?.value ?? ""],
                  ["hasWords", hasWords],
                  ["hasTitles", hasTitles],
                  ["hasSeats", hasSeats],
                  ["hasDiedOut", hasDiedOut],
                  ["hasAncestralWeapons", hasAncestralWeapons],
                  ["pageSize", pageSize],
                ].filter(([, v]) => Boolean(v))
              )
            );

            fetch(`https://anapioficeandfire.com/api/houses?${params}`)
              .then((x) => {
                setLinkHeader(x.headers.get("Link") ?? "");
                return x.json();
              })
              .then((rsp) => {
                setHouses(rsp);
                setLoading(false);
              });
          }}
        >
          <Select
            theme={customTheme}
            options={optionRegions}
            onChange={(e) => setRegion({ value: e?.value })}
            placeholder="Select a region"
            isSearchable
            className="select-region"
          />
          <Select
            components={makeAnimated()}
            theme={customTheme}
            options={optionProperties}
            onChange={(e) => {
              if (e !== null) {
                setOptionProperties(Array.isArray(e) ? e : [e]);
              }
            }}
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
            onChange={(e) => {
              if (e !== null) {
                setPageSize(e.value);
              }
            }}
            placeholder="Result per page"
            isSearchable
            className="select-page-size"
          />
          <button type="submit" id="search-btn" className="btn">
            Search <FontAwesomeIcon icon="search" />
          </button>
        </form>
      </div>
      <div className="search-result">
        <div className="list-items ">
          {loading ? (
            <Loading />
          ) : (
            houses.map((house) => <ListItem key={house.url} house={house} />)
          )}
        </div>
      </div>
      <div className="next-prev-buttons">
        {maybePrevUrl && (
          <button
            className="prev-button"
            onClick={() => fetchUrl(maybePrevUrl)}
          >
            Previous page
          </button>
        )}
        {maybeNextUrl && (
          <button
            className="next-button"
            onClick={() => fetchUrl(maybeNextUrl)}
          >
            Next page
          </button>
        )}
      </div>
    </div>
  );
};
