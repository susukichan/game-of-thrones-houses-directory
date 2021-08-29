// @ts-nocheck

import { useState } from "react";
import Modal from "./Modal";

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
  const houseData = [
    { greyjoy: 169 },
    { tully: 395 },
    { baratheon: 17 },
    { lannister: 229 },
    { stark: 362 },
    { targaryen: 378 },
    { arryn: 7 },
    { martell: 285 },
    { tyrell: 398 },
  ];

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          flexWrap: "wrap",
        }}
      >
        {houseData.map((data) => (
          <HouseCard
            key={Object.values(data)}
            houseId={data[Object.keys(data)]}
            houseName={Object.keys(data)}
          />
        ))}
      </div>
    </>
  );
};
interface HouseProps {
  //type of key?
  key: Key | null | undefined;
  houseId: number;
  houseName: string[];
}

const HouseCard = ({ houseId, houseName }: HouseProps): JSX.Element => {
  const [house, setHouse] = useState<null | House>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentLord, setCurrentLord] = useState("");
  const [overlord, setOverlord] = useState("");
  const [heir, setHeir] = useState("");
  const [founder, setFounder] = useState("");
  const [swornMembers, setSwornMembers] = useState<Array<string>>([]);

  return (
    <>
      <div
        className="card"
        style={{
          padding: "8px 24px",
        }}
        onClick={() => {
          fetch(`https://anapioficeandfire.com/api/houses/${houseId}`)
            .then((x) => x.json())
            .then((rsp) => {
              if (rsp.currentLord) {
                fetch(rsp.currentLord)
                  .then((x) => x.json())
                  .then((rsp) => setCurrentLord(rsp));
              }
              if (rsp.overlord) {
                fetch(rsp.overlord)
                  .then((x) => x.json())
                  .then((rsp) => setOverlord(rsp));
              }
              if (rsp.heir) {
                fetch(rsp.heir)
                  .then((x) => x.json())
                  .then((rsp) => setHeir(rsp));
              }
              if (rsp.founder) {
                fetch(rsp.founder)
                  .then((x) => x.json())
                  .then((rsp) => setFounder(rsp));
              }
              if (rsp.swornMembers.length > 1) {
                let ListOfSwornMembers = [];
                for (let i = 0; i < rsp.swornMembers.length; i++) {
                  fetch(rsp.swornMembers[i])
                    .then((x) => x.json())
                    .then((rsp) => ListOfSwornMembers.push(rsp.name));
                }
                setSwornMembers(ListOfSwornMembers);
              }

              setHouse(rsp);
            });

          setModalIsOpen(true);
        }}
      >
        <img src={`${houseName}.jpg`} alt={houseName} />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        house={house}
        currentLord={currentLord}
        overlord={overlord}
        heir={heir}
        swornMembers={swornMembers}
        founder={founder}
      />
    </>
  );
};
export default NineHouses;
