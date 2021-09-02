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
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="modal-content">
              <DataBlock houseWithMetadata={houseWithMetadata} />
            </div>
            <button className="modal-button" onClick={onClose}>
              close
            </button>
          </>
        )}
      </div>
    </>
  );
};
