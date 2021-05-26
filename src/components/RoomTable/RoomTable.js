import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Table, Label } from "semantic-ui-react";
import { GlobalContext } from "../../App";
import NoData from "../NoData/NoData";
import "./RoomTable.css";

const RoomTable = () => {
  const [globalState, setGlobalState] = useContext(GlobalContext);

  const fetchRooms = () => {
    return axios.get("http://localhost:8080/rooms");
  };

  useEffect(() => {
    fetchRooms().then((result) => {
      setGlobalState({ ...globalState, rooms: result.data });
    });
  }, []);

  return (
    <Table celled>
      {globalState?.rooms && globalState?.rooms?.length > 0 && (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>roomNo</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Level</Table.HeaderCell>
            <Table.HeaderCell>BuildingNo</Table.HeaderCell>
            <Table.HeaderCell>Capacity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      )}
      {!globalState?.rooms && <NoData msg="No Record" />}
      <Table.Body>
        {globalState?.rooms?.map((x) => (
          <Table.Row key={x.id}>
            <Table.Cell>
              <Label>{x.roomNo}</Label>
            </Table.Cell>
            <Table.Cell>{x.name}</Table.Cell>
            <Table.Cell>{x.level == null ? "-" : x.level}</Table.Cell>
            <Table.Cell>{x.buildingNo == null ? "-" : x.buildingNo}</Table.Cell>
            <Table.Cell>{x.capacity == null ? "-" : x.capacity}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default RoomTable;
