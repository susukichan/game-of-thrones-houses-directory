//@ts-nocheck

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
  const houseData = {
    greyjoy: 169,
    tully: 395,
    baratheon: 17,
    lannister: 229,
    stark: 362,
    targaryen: 378,
    arryn: 7,
    martell: 285,
    tyrell: 398,
  };

  return (
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
      <div className="page-title">Nine Great Houses of Westeros</div>
      <div
        className="content-wrap"
        style={{
          backgroundColor: "#FAFAFA",
          width: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          position: "absolute",
          top: "60%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          paddingTop: "2rem",
        }}
      >
        {Object.entries(houseData).map(([k, v]) => (
          <HouseCard key={k} houseId={v} houseName={k} />
        ))}
      </div>
    </div>
  );
};

interface Data {
  house: House;
  swornMembers: any;
  currentLord: any;
  overlord: any;
  heir: any;
  founder: any;
}
interface HouseProps {
  houseId: number;
  houseName: string[];
}

const HouseCard = ({ houseId, houseName }: HouseProps): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Data>({
    house: "",
    swornMembers: [],
    currentLord: { name: "Unknown" },
    overlord: { name: "Unknown" },
    heir: { name: "Unknown" },
    founder: { name: "Unknown" },
  });

  return (
    <>
      <div
        className="card"
        style={{
          padding: "16px 24px",
        }}
        onClick={async () => {
          setModalIsOpen(true);
          setLoading(true);
          setData(await fetchData(houseId));
          setLoading(false);
        }}
      >
        <img
          src={`${houseName}.jpg`}
          alt={houseName}
          style={{
            boxShadow: "5px -1px 28px 7px rgba(166,148,148,0.33)",
          }}
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        data={data}
        loading={loading}
        houseName={houseName}
      />
    </>
  );
};
export default NineHouses;

const fetchJSON = (url: string) => fetch(url).then((rsp) => rsp.json());
const fetchJSONOrDefault = <A,>(url: string, def: A) =>
  url === "" ? Promise.resolve(def) : fetchJSON(url);

const fetchData = async (houseId: string): Data => {
  const houseRsp: House = await fetchJSON(
    `https://anapioficeandfire.com/api/houses/${houseId}`
  );

  const getSwornMembers = () =>
    Promise.all(houseRsp.swornMembers.map((member) => fetchJSON(member)));

  const [swornMembers, currentLord, overlord, heir, founder] =
    await Promise.all([
      getSwornMembers(),
      fetchJSONOrDefault(houseRsp.currentLord, { name: "Unknown" }),
      fetchJSONOrDefault(houseRsp.overlord, { name: "Unknown" }),
      fetchJSONOrDefault(houseRsp.heir, { name: "Unknown" }),
      fetchJSONOrDefault(houseRsp.founder, { name: "Unknown" }),
    ]);

  return {
    house: houseRsp,
    swornMembers,
    currentLord,
    overlord,
    heir,
    founder,
  };
};
