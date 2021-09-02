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
  const getDetail = (x: any) =>
    Promise.all(x.map((member: any) => fetchJSON(member)));

  const [swornMembers, cadetBranches, currentLord, overlord, heir, founder] =
    await Promise.all([
      getDetail(house.swornMembers),
      getDetail(house.cadetBranches),
      fetchJSONOrDefault(house.currentLord, { name: "" }),
      fetchJSONOrDefault(house.overlord, { name: "" }),
      fetchJSONOrDefault(house.heir, { name: "" }),
      fetchJSONOrDefault(house.founder, { name: "" }),
    ]);

  return {
    house: house,
    swornMembers,
    cadetBranches,
    currentLord,
    overlord,
    heir,
    founder,
  };
};
