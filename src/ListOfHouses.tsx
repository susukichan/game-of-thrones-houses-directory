import { useState, useEffect } from "react";

const ListOfHouses = (props: any) => {
  const [houses, setHouses] = useState([]);

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
      <h1>houses</h1>
      <pre>{JSON.stringify(houses, null, 2)}</pre>
      <h3>route props</h3>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

export default ListOfHouses;
