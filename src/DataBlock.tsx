import { HasHouseWithMetadata } from "./types";

interface DataBlockProps extends HasHouseWithMetadata {}

export const DataBlock = ({
  houseWithMetadata: {
    house,
    currentLord,
    overlord,
    heir,
    swornMembers,
    founder,
  },
}: DataBlockProps): JSX.Element => {
  const maybeWeapons = house?.ancestralWeapons.join(",");

  return (
    <div className="data-block" style={{ backgroundColor: "white" }}>
      <h1>this is Data Block</h1>
      <div className="modal-content">
        <h2>{house?.name}</h2>
        <ul className="modal-content-list">
          <li>Region: {house?.region}</li>
          <li>Coat of Arms: {house?.coatOfArms}</li>
          <li>Words: {house?.words}</li>
          <li>Seats: {house?.seats}</li>
          <li>Current Lord: {currentLord.name}</li>
          <li>Heir: {heir.name}</li>
          <li>Overlord: {overlord.name}</li>
          {house?.founded && <li>Founded: {house?.founded}</li>}

          <li>founder: {founder.name}</li>
          {house?.diedOut && <li>Died out: {house?.diedOut}</li>}
          {maybeWeapons && <li>Ancestral weapons: {maybeWeapons}</li>}
          {/* <li>Cadet branches: {house?.cadetBranches}</li> */}
          <li>
            {/* Sworn members: {swornMembers.map((member) => ` ${member.name} |`)} */}
          </li>
        </ul>
      </div>
    </div>
  );
};
