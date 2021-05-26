import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "semantic-ui-react";
import { GlobalContext } from "../../App";
import "./RoomDetails.css";

const RoomDetails = ({ roomId }) => {
  const [globalState, setGlobalState] = useContext(GlobalContext);
  const [info, setInfo] = useState();

  const findRoomById = (id) => {
    return axios.get("http://localhost:8080/rooms/" + id);
  };

  useEffect(() => {
    if (roomId) {
      findRoomById(globalState.selectedRoomId).then((result) => {
        setInfo(result.data);
      });
    } else {
      setInfo();
    }
  }, [roomId]);

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4} className="label-key">
            roomNo
          </Grid.Column>
          <Grid.Column width={1} className="label-val">
            :
          </Grid.Column>
          <Grid.Column width={11} className="label-val">
            {info?.roomNo}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4} className="label-key">
            Name
          </Grid.Column>
          <Grid.Column width={1} className="label-val">
            :
          </Grid.Column>
          <Grid.Column width={8} className="label-val">
            {info?.name}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4} className="label-key">
            Level
          </Grid.Column>
          <Grid.Column width={1} className="label-val">
            :
          </Grid.Column>
          <Grid.Column width={8} className="label-val">
            {info?.level}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4} className="label-key">
            BuildingNo
          </Grid.Column>
          <Grid.Column width={1} className="label-val">
            :
          </Grid.Column>
          <Grid.Column width={8} className="label-val">
            {info?.buildingNo}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4} className="label-key">
            Capacity
          </Grid.Column>
          <Grid.Column width={1} className="label-val">
            :
          </Grid.Column>
          <Grid.Column width={8} className="label-val">
            {info?.capacity}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default RoomDetails;
