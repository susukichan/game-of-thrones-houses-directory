import { useState } from "react";
import { fetchHouse, fetchHouseMetaData } from "./api";
import { Modal } from "./components/Modal/Modal";
import "./nine-houses-style.css";
import { HouseWithMetadata, mkInitialHouseMetadata } from "./types";

export const NineHouses = () => {
  const houseIdFromHouseName = {
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
    <div className="nine-houses container">
      <div className="nine-houses-page-title">
        Nine Great Houses of Westeros
      </div>
      <div className="content-wrap">
        {Object.entries(houseIdFromHouseName).map(([k, v]) => (
          <HouseCard key={k} houseId={v} houseName={k} />
        ))}
      </div>
    </div>
  );
};

interface HouseProps {
  houseId: number;
  houseName: string;
}

const HouseCard = ({ houseId, houseName }: HouseProps): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [houseWithMetadata, setHouseWithMetaData] = useState<HouseWithMetadata>(
    mkInitialHouseMetadata
  );

  return (
    <>
      <div
        className="card"
        onClick={async () => {
          setModalIsOpen(true);
          setLoading(true);
          const house = await fetchHouse(houseId);
          setHouseWithMetaData(await fetchHouseMetaData(house));
          setLoading(false);
        }}
      >
        <img src={`${houseName}.jpg`} alt={houseName} className="card-image" />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        houseWithMetadata={houseWithMetadata}
        loading={loading}
        houseName={houseName}
      />
    </>
  );
};
