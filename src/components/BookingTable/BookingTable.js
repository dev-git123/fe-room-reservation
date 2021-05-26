import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Table, Label } from "semantic-ui-react";
import { GlobalContext } from "../../App";
import NoData from "../NoData/NoData";
import "./BookingTable.css";

const BookingTable = () => {
  const [globalState, setGlobalState] = useContext(GlobalContext);
  const [bookings, setBookings] = useState();

  const fetchBookings = () => {
    return axios.get("http://localhost:8080/meetingRoom/booking/", {
      params: {
        employeeId: globalState.managedEmployeeId,
      },
    });
  };

  useEffect(() => {
    console.log("fetch booking....");
    fetchBookings().then((result) => {
      setGlobalState({
        ...globalState,
        bookings: result.data,
      });
      setBookings(result.data);
    });
  }, [globalState.isSuccess, globalState.bookingModalOpen]);

  return (
    <Table celled>
      {bookings?.length > 0 && (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>BookingNo</Table.HeaderCell>
            <Table.HeaderCell>StartDateTime</Table.HeaderCell>
            <Table.HeaderCell>EndDateTime</Table.HeaderCell>
            <Table.HeaderCell>RoomNo</Table.HeaderCell>
            <Table.HeaderCell>Capacity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      )}
      {bookings?.length === 0 && <NoData msg="No room is reserved ! " />}
      <Table.Body>
        {bookings?.map((x) => (
          <Table.Row key={x.id}>
            <Table.Cell>
              <Label>{x.bookingNo}</Label>
            </Table.Cell>
            <Table.Cell>
              {moment(x.startDateTime).format("YYYY/MM/DD hh:mm A")}
            </Table.Cell>
            <Table.Cell>
              {moment(x.endDateTime).format("YYYY/MM/DD hh:mm A")}
            </Table.Cell>
            <Table.Cell>{x.room.roomNo}</Table.Cell>
            <Table.Cell>{x.room.capacity}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default BookingTable;
