// @ts-nocheck
import DataBlock from "./DataBlock";
import "./modal-style.css";

const Modal = ({
  isOpen,
  onClose,
  houseName,
  data,
  // data: { house, currentLord, overlord, heir, swornMembers, founder },
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay"></div>
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
          <DataBlock data={data} />
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

export default Modal;
