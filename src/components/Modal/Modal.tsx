import { DataBlock } from "../../DataBlock";
import { HasHouseWithMetadata } from "../../types";
import { Loading } from "../Loading/Loading";

import "./modal-style.css";

interface ModalProps extends HasHouseWithMetadata {
  isOpen: boolean;
  onClose: () => void;
  houseName: string;
  loading: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  houseName,
  houseWithMetadata,
  loading,
}: ModalProps): JSX.Element => {
  if (!isOpen) {
    return <></>;
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className={`modal modal--${houseName}`}>
        {/* cannot make it .eachHouse */}
        {/* <ul>
          {houseProperties.map((eachHouse) => (
            <li key={eachHouse}>
            {eachHouse}:{house?.eachHouse}
            </li>
            ))}
          </ul> */}
        <div className="modal-content">
          {/* <h2>{house?.name}</h2> */}

          {loading ? (
            <Loading />
          ) : (
            <DataBlock houseWithMetadata={houseWithMetadata} />
          )}
          {/* <DataBlock data={data} /> */}
          {/* <ul className="modal-content-list">
            <li>Region: {house?.region}</li>
            <li>Coat of Arms: {house?.coatOfArms}</li>
            <li>Words: {house?.words}</li>
            <li>Seats: {house?.seats}</li>
            <li>Current Lord: {currentLord.name}</li>
            <li>Heir: {heir.name}</li>
            <li>Overlord: {overlord.name}</li>
            {house?.founded ? <li>Founded: {house?.founded}</li> : null}

            <li>founder: {founder.name}</li>
            {house?.diedOut ? <li>Died out: {house?.diedOut}</li> : null}
            {house?.ancestralWeapon ? (
              <li>Ancestral weapons: {house?.ancestralWeapons}</li>
            ) : null}
            <li>Cadet branches: {house?.cadetBranches}</li>
            <li>
              Sworn members: {swornMembers.map((member) => ` ${member.name} |`)}
            </li>
          </ul> */}
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>
            found more houses in the same region
          </button>
          <button onClick={onClose}>close</button>
        </div>
      </div>
    </>
  );
};
