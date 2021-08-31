// @ts-nocheck

const DataBlock = ({
  data: { house, name, currentLord, overlord, heir, swornMembers, founder },
}) => {
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
          {/* <li>Current Lord: {currentLord.name}</li>
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
          </li> */}
        </ul>
      </div>
    </div>
  );
};
export default DataBlock;
