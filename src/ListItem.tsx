// @ts-nocheck

import "./list-item-style.css";
import DataBlock from "./DataBlock";

const ListItem = (data) => {
  return (
    <div className="list-item">
      <DataBlock data={data} />
    </div>
  );
};

export default ListItem;
