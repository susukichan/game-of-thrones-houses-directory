// @ts-nocheck

const Modal = ({ isOpen, onClose, house }) => {
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
        <p>region: {house?.region}</p>
        <p>coatOfArms: {house?.coatOfArms}</p>
        <p>words: {house?.words}</p>
        <p>seats: {house?.seats}</p>
        {house?.currentLord}
        {/* <p>currentLord: {currentLord}</p> */}
        <p>heir: {house?.heir}</p>
        <p>overlord: {house?.overlord}</p>
        <p>founded: {house?.founded}</p>
        <p>founder: {house?.founder}</p>
        <p>diedOut:{house?.diedOut}</p>
        <p>ancestralWeapons: {house?.ancestralWeapons}</p>
        <p>cadetBranches: {house?.cadetBranches}</p>

        {/* <p>{house?.swornMembers}</p> */}
        <button onClick={onClose}>close</button>
      </div>
    </>
  );
};

export default Modal;
