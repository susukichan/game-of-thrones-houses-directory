// @ts-nocheck
import { useState } from "react";
interface House {
  /** The hypermedia URL of this resource */
  url: string;
  /** The name of this house */
  name: string;
  /** The region that this house resides in */
  region: string;
  /** Text describing the coat of arms of this house */
  coatOfArms: string;
  /** The words of this house*/
  words: string;
  /** The titles that this house holds*/
  titles: Array<string>;
  /** The seats that this house holds*/
  seats: Array<string>;
  /** The Character resource URL of this house's current lord*/
  currentLord: string;
  /** The Character resource URL of this house's heir*/
  heir: string;
  /** The House resource URL that this house answers to*/
  overlord: string;
  /** The year that this house was founded*/
  founded: string;
  /** The Character resource URL that founded this house*/
  founder: string;
  /** The year that this house died out*/
  diedOut: string;
  /** An array of names of the noteworthy weapons that this house owns */
  ancestralWeapons: Array<string>;
  /** An array of House resource URLs that was founded from this house */
  cadetBranches: Array<string>;
  /**  An array of Character resource URLs that are sworn to this house*/
  swornMembers: Array<string>;
}
const NineHouses = () => {
  return (
    <div>
      <h1>NineHouses</h1>
      <HouseCard houseId={169} />
      <hr />
      <HouseCard houseId={45} />
      <hr />
      <HouseCard houseId={2} />
      <hr />
      <HouseCard houseId={345} />
      <hr />
      <HouseCard houseId={34} />
      <hr />
      <HouseCard houseId={24} />
      <hr />
      <HouseCard houseId={56} />
      <hr />
    </div>
  );
};
interface HouseProps {
  houseId: number;
}
// const add = (x: number, y: number): number => x + y;
const HouseCard = ({ houseId }: HouseProps): JSX.Element => {
  const [house, setHouse] = useState<null | House>(null);
  return (
    <div
      className="card"
      onClick={() => {
        fetch(`https://anapioficeandfire.com/api/houses/${houseId}`)
          .then((x) => x.json())
          .then((rsp) => setHouse(rsp));
      }}
    >
      {house ? house.region : <h1>click me to get a house</h1>}
    </div>
  );
};
export default NineHouses;
