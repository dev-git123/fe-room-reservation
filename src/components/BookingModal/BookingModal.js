import React, { useEffect, useContext, useState } from "react";
import { Button, Modal, Dropdown, Grid, Card } from "semantic-ui-react";
import { GlobalContext } from "../../App";
import _, { set } from "lodash";
import axios from "axios";
import moment from "moment";
import RoomDetails from "../RoomDetails/RoomDetails";
import "./BookingModal.css";

function BookingModal({ roomsData }) {
  const [globalState, setGlobalState] = useContext(GlobalContext);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState();

  useEffect(() => {
    setRooms(roomsData);
  }, [roomsData]);

  useEffect(() => {
    if (globalState?.availableRooms) {
      setRooms(globalState.availableRooms);
    }
  }, [globalState.availableRooms]);

  useEffect(() => {
    if (globalState.bookingModalOpen) {
      setOpen(globalState.bookingModalOpen);
    }
  }, [globalState.bookingModalOpen]);

  useEffect(() => {
    if (globalState?.availableRooms) {
      setRooms(globalState?.availableRooms);
    }
  }, [globalState.availableRooms]);

  useEffect(() => {
    const stateOptions = _.map(rooms, (room, index) => ({
      key: room.id,
      text: room.roomNo,
      value: room.id,
    }));
    setOptions(stateOptions);
  }, [rooms]);

  useEffect(() => {
    setGlobalState({
      ...globalState,
      bookingModalOpen: open,
    });
  }, [open]);

  const bookRoom = () => {
    return axios.post("http://localhost:8080/meetingRoom/booking", {
      bookingNo: "x111",
      startDateTime: moment(globalState.startDateTime).toISOString(true),
      endDateTime: moment(globalState.endDateTime).toISOString(true),
      roomId: globalState.selectedRoomId,
      employeeNo: globalState.employeeId,
    });
  };

  const putBooking = () => {
    bookRoom()
      .then((result) => {
        setGlobalState({
          ...globalState,

          isSuccess: moment(),
          msgModalOpen: true,
          msgModal: "Successfully Reserved!",
          bookingModalOpen: false,
        });
        setOpen(false);
        setRoomId(null);
      })
      .catch(function (error) {
        if (error.response) {
          setGlobalState({
            ...globalState,
            msgModalOpen: true,
            msgModal: error.response.data.message,
          });
        }
      });
  };

  const selectRoom = (event, { value }) => {
    setGlobalState({
      ...globalState,
      selectedRoomId: value, //id
    });
    setRoomId(value);
  };

  const onChangeText = (event) => {
    setGlobalState({
      ...globalState,
      employeeId: event.target.value,
    });
  };

  return (
    <Modal onOpen={() => setOpen(true)} open={open}>
      <Modal.Header className="header">
        {rooms && rooms.length > 0 ? (
          <div>Please reserve one of these available rooms!</div>
        ) : (
          <div className="error">
            All meeting rooms are reserved already! Please choose another
            timing!
          </div>
        )}
      </Modal.Header>
      {rooms && rooms.length > 0 && (
        <Modal.Content className="alignment">
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <div className="flex">
                  <label className="label-form">Room No :</label>
                  <Dropdown
                    placeholder="Please Choose One "
                    search
                    options={options}
                    onChange={selectRoom}
                    fluid
                    selection
                  />
                </div>
              </Grid.Column>
              <Grid.Column>
                <label className="label-form">EmployeeId :</label>
                <input
                  name="employeeId"
                  value={globalState.employeeId}
                  onChange={onChangeText}
                  required={true}
                />
              </Grid.Column>
            </Grid.Row>
            {roomId && (
              <Grid.Row>
                <Card className="room-details">
                  <RoomDetails roomId={roomId} />
                </Card>
              </Grid.Row>
            )}
          </Grid>
        </Modal.Content>
      )}
      {rooms && rooms.length > 0 ? (
        <Modal.Actions>
          <Button
            color="black"
            onClick={() => {
              setOpen(false);
              setRoomId(null);
            }}
          >
            Nope
          </Button>
          <Button
            content="Book"
            labelPosition="right"
            icon="checkmark"
            onClick={putBooking}
            positive
            disabled={!roomId || !globalState.employeeId}
          />
        </Modal.Actions>
      ) : (
        <Modal.Actions className="footer">
          <Button
            color="black"
            onClick={() => {
              setOpen(false);
            }}
          >
            OK
          </Button>
        </Modal.Actions>
      )}
    </Modal>
  );
}

export default BookingModal;
