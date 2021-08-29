// @ts-nocheck

const Modal = ({
  isOpen,
  onClose,
  house,
  currentLord,
  overlord,
  heir,
  swornMembers,
  founder,
}) => {
  if (!isOpen) return null;
  // const [currentLord, setCurrentLord] = useState("");
  // const houseProperties = [
  //   "name",
  //   "region",
  //   "coatOfArms",
  //   "words",
  //   "seats",
  //   "currentLord",
  //   "heir",
  // ];

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,.7)",
          zIndex: 1000,
        }}
        className="modal-overlay"
      ></div>
      <div
        style={{
          backgroundColor: "green",
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          padding: "50px",
          zIndex: 1000,
        }}
        className="modal"
      >
        <h2>name: {house?.name}</h2>
        {/* cannot make it .eachHouse */}
        {/* <ul>
          {houseProperties.map((eachHouse) => (
            <li key={eachHouse}>
            {eachHouse}:{house?.eachHouse}
            </li>
            ))}
          </ul> */}
        <ul
          style={{
            listStyleType: "none",
            margin: 0,
            padding: 0,
          }}
        >
          <li>region: {house?.region}</li>
          <li>coatOfArms: {house?.coatOfArms}</li>
          <li>words: {house?.words}</li>
          <li>seats: {house?.seats}</li>
          <li>currentLord: {currentLord.name}</li>
          <li>heir: {heir.name}</li>
          <li>overlord: {overlord.name}</li>
          <li>founded: {house?.founded}</li>
          <li>founder: {founder.name}</li>
          <li>diedOut:{house?.diedOut}</li>
          <li>ancestralWeapons: {house?.ancestralWeapons}</li>
          <li>cadetBranches: {house?.cadetBranches}</li>
          <li>swornMembers: {swornMembers.map((member) => ` ${member} |`)}</li>
        </ul>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
