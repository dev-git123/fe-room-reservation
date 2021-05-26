import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Grid, Table, Label, Icon } from "semantic-ui-react";
import { GlobalContext } from "../../App";
import moment from "moment";
import NoData from "../NoData/NoData";
import "./RemoveBookingTable.css";

const RemoveBookingTable = () => {
  const [globalState, setGlobalState] = useContext(GlobalContext);
  const [employeeId, setEmployeeId] = useState();
  const [bookingRows, setBookingRows] = useState([]);
  const [err, setErr] = useState([]);

  useEffect(() => {
    viewBooking();
  }, []);

  const onChangeText = (event) => {
    setEmployeeId(event.target.value);
  };

  useEffect(() => {
    viewBooking();
  }, [employeeId]);

  const fetchBookings = () => {
    return axios.get("http://localhost:8080/meetingRoom/booking", {
      params: {
        employeeNo: employeeId,
      },
    });
  };

  const viewBooking = () => {
    setErr("");
    setBookingRows([]);
    fetchBookings()
      .then((result) => {
        setBookingRows(result.data);
        setGlobalState({
          ...globalState,
          manageBookings: result.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          setErr(error.response.data.message);
        }
      });
  };

  useEffect(() => {
    viewBooking();
  }, [globalState.isSuccess]);

  const deleteBooking = (id) => {
    return axios.delete("http://localhost:8080/meetingRoom/booking/" + id);
  };

  const handleDeleteBooking = (val) => {
    console.log("handle booking...", val);
    deleteBooking(val).then((result) => {
      setGlobalState({
        ...globalState,
        isSuccess: moment(),
        msgModalOpen: true,
        msgModal: "Successfully Cancelled!",
      });
    });
  };
  return (
    <div>
      <Form>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Form.Field>
                <input
                  name="employeeId"
                  placeholder="Please enter the employee num who did reservation for cancellation !"
                  value={employeeId}
                  onChange={onChangeText}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <Button
                  type="submit"
                  onClick={viewBooking}
                  disabled={!employeeId}
                  icon
                >
                  <Icon name="search" />
                </Button>
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row></Grid.Row>
        </Grid>
      </Form>
      <Table celled>
        {bookingRows?.length > 0 && (
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>BookingNo</Table.HeaderCell>
              <Table.HeaderCell>StartDateTime</Table.HeaderCell>
              <Table.HeaderCell>EndDateTime</Table.HeaderCell>
              <Table.HeaderCell>RoomNo</Table.HeaderCell>
              <Table.HeaderCell>Capacity</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        )}
        {bookingRows?.length === 0 && (
          <NoData msg="You have no room reserved" />
        )}

        <Table.Body>
          {bookingRows?.map((x) => (
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

              <Table.Cell>
                {employeeId && employeeId === x.employee.employeeNo && (
                  <Button primary onClick={(e) => handleDeleteBooking(x.id)}>
                    Delete
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default RemoveBookingTable;
