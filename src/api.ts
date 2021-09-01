import { House, HouseWithMetadata } from "./types";

/**
 * INFO I typecast the api reponse based on their documentation and through parsing
 */

const fetchJSON = (url: string) => fetch(url).then((rsp) => rsp.json());
const fetchJSONOrDefault = <A>(url: string, def: A) =>
  url === "" ? Promise.resolve(def) : fetchJSON(url);

export const fetchHouse = (houseId: number): Promise<House> =>
  fetchJSON(`https://anapioficeandfire.com/api/houses/${houseId}`);

export const fetchHouseMetaData = async (
  house: House
): Promise<HouseWithMetadata> => {
  const getSwornMembers = () =>
    Promise.all(house.swornMembers.map((member) => fetchJSON(member)));

  const [swornMembers, currentLord, overlord, heir, founder] =
    await Promise.all([
      getSwornMembers(),
      fetchJSONOrDefault(house.currentLord, { name: "Unknown" }),
      fetchJSONOrDefault(house.overlord, { name: "Unknown" }),
      fetchJSONOrDefault(house.heir, { name: "Unknown" }),
      fetchJSONOrDefault(house.founder, { name: "Unknown" }),
    ]);

  return {
    house: house,
    swornMembers,
    currentLord,
    overlord,
    heir,
    founder,
  };
};
