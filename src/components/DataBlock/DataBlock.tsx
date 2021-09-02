import { HasHouseWithMetadata } from "../../types";
import "./data-block-style.css";

interface DataBlockProps extends HasHouseWithMetadata {}

export const DataBlock = ({
  houseWithMetadata: {
    house,
    currentLord,
    overlord,
    heir,
    swornMembers,
    cadetBranches,
    founder,
  },
}: DataBlockProps): JSX.Element => {
  const maybeWeapons = house?.ancestralWeapons.join(",");

  return (
    <div className="data-block">
      <h2 className="data-block__title">{house?.name}</h2>
      <div className="data-block__content-list">
        <div className="data-block__content-row">
          <div className="data-block__content-row-title">
            <h4>🗺 Region:</h4>
          </div>
          <div>{house?.region}</div>
        </div>
        {house?.coatOfArms && (
          <div className="data-block__content-row">
            <div className="data-block__content-row-title">
              <h4>🛡 Coat of Arms:</h4>
            </div>
            <div>{house?.coatOfArms}</div>
          </div>
        )}
        {house?.words && (
          <div className="data-block__content-row">
            <div className="data-block__content-row-title">
              <h4>🎤 Words:</h4>
            </div>
            <div>{house?.words}</div>
          </div>
        )}
        {house?.seats[0] && (
          <div className="data-block__content-row">
            <div className="data-block__content-row-title">
              <h4>🪑 Seats:</h4>
            </div>
            <div>{house?.seats}</div>
          </div>
        )}
        {currentLord.name && (
          <div className="data-block__content-row">
            <div className="data-block__content-row-title">
              <h4>🧙 Current Lord:</h4>
            </div>
            <div>{currentLord.name}</div>
          </div>
        )}
        {heir.name && (
          <div className="data-block__content-row">
            <div className="data-block__content-row-title">
              <h4>👨‍👩‍👦 Heir:</h4>
            </div>
            <div>{heir.name}</div>
          </div>
        )}
        {overlord.name && (
          <div className="data-block__content-row">
            <div className="data-block__content-row-title">
              <h4>🧝 Overlord:</h4>
            </div>
            <div>{overlord.name}</div>
          </div>
        )}
        {house?.founded && (
          <div className="data-block__content-row">
            <div className="data-block__content-row-title">
              <h4>📅 Founded:</h4>
            </div>
            <div>{house?.founded}</div>
          </div>
        )}
        {founder.name && (
          <div className="data-block__content-row">
            <div className="data-block__content-row-title">
              <h4>👨‍🦳 Founder:</h4>
            </div>
            <div>{founder.name}</div>
          </div>
        )}
        {house?.diedOut && (
          <div className="data-block__content-row">
            <div className="data-block__content-row-title">
              {" "}
              <h4>🧟 Died out:</h4>
            </div>
            <div>{house?.diedOut}</div>
          </div>
        )}
        {maybeWeapons && (
          <div className="data-block__content-row">
            <div className="data-block__content-row-title">
              <h4>🪓 Ancestral weapons:</h4>
            </div>
            <div>{maybeWeapons}</div>
          </div>
        )}

        {cadetBranches.length > 1 && (
          <div className="data-block__content-row">
            <div className="data-block__content-row-title">
              <h4>🏰 Cadet branches:</h4>
            </div>
            <div>{cadetBranches.map((member) => ` ${member.name}．`)}</div>
          </div>
        )}
        {swornMembers.length > 1 && (
          <div className="data-block__content-row">
            <div className="data-block__content-row-title">
              <h4>⚔️ Sworn members:</h4>
            </div>
            <div>{swornMembers.map((member) => ` ${member.name} ．`)}</div>
          </div>
        )}
      </div>
    </div>
  );
};
