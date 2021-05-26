import React from "react";
import { Icon } from "semantic-ui-react";
import "./NoData.css";

function NoData({ msg }) {
  return (
    <div className="content">
      {msg}
      <Icon className="no-data" name="exclamation" />
    </div>
  );
}

export default NoData;
