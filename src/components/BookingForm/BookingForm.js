import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import { Button, Form, Grid } from "semantic-ui-react";
import { GlobalContext } from "../../App";
import axios from "axios";
import DatePicker from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "./BookingForm.css";
import BookingModal from "../BookingModal/BookingModal";
import BookingTable from "../BookingTable/BookingTable";

const BookingForm = () => {
  const [globalState, setGlobalState] = useContext(GlobalContext);
  const [startDate, setStartDate] = useState(moment(globalState.startDateTime));
  const [endDate, setEndDate] = useState(moment(globalState.endDateTime));
  const [employeeId, setEmployeeId] = useState([]);
  const [startError, setStartError] = useState(null);
  const [endError, setEndError] = useState(null);

  const findAvailableRoom = () => {
    return axios.get("http://localhost:8080/rooms/available", {
      params: {
        from: startDate.toISOString(true),
        to: endDate.toISOString(true),
      },
    });
  };

  const fetchAvailableRoom = () => {
    findAvailableRoom().then((result) => {
      setGlobalState({
        ...globalState,
        availableRooms: result.data,
        bookingModalOpen: true,
      });
    });
  };

  const handleStartChange = (value) => {
    setStartError(null);
    var start = moment(globalState.startDateTime).set({
      second: 0,
      millisecond: 0,
    });
    var end = moment(globalState.endDateTime).set({
      second: 0,
      millisecond: 0,
    });
    debugger;
    if (
      start.isSame(end) &&
      start.hour() === end.hour() &&
      start.minute() === end.minute()
    ) {
      setStartError("***Start Time can't be same with End Time***");
    } else if (start.isBefore(moment())) {
      setStartError("***Start Time can't be before Current Time***");
    } else if (start.isBefore(end)) {
      setStartError(null);
      setEndError(null);
    } else setStartError("***Start Time cannot be after End Time***");
    isCheck();
  };

  const handleEndChange = (value) => {
    setEndError(null);
    var start = moment(globalState.startDateTime).set({
      second: 0,
      millisecond: 0,
    });
    var end = moment(globalState.endDateTime).set({
      second: 0,
      millisecond: 0,
    });
    debugger;
    if (
      start.date() === end.date() &&
      start.hour() === end.hour() &&
      start.minute() === end.minute()
    ) {
      setEndError("***Start Time can't be same with End Time***");
    } else if (end.isBefore(moment())) {
      setEndError("***End Time can't be before Current Time***");
    } else if (end.isAfter(start)) {
      setEndError(null);
      setStartError(null);
    } else setEndError("***End Time cannot be before Start Time***");
    isCheck();
  };

  const isCheck = () => {
    if (moment(startDate).isBefore(moment())) {
      setStartError("***Start Time can't be before current date time***");
    }
    if (moment(endDate).isBefore(moment())) {
      setEndError("***End Time can't be before current date time***");
    }
  };

  useEffect(() => {
    setGlobalState({
      ...globalState,
      startDateTime: startDate,
    });
  }, [startDate]);

  useEffect(() => {
    setGlobalState({
      ...globalState,
      endDateTime: endDate,
    });
  }, [endDate]);

  useEffect(() => {
    setGlobalState({
      ...globalState,
      employeeId: employeeId,
    });
  }, [employeeId]);

  return (
    <Form>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Form.Field>
              <label className="error">{startError}</label>
              <label className="from">From</label>
              <DatePicker
                value={moment(startDate)}
                onChange={(val) => {
                  setStartDate(val);
                  setGlobalState({
                    ...globalState,
                    startDateTime: val,
                  });
                }}
                onClose={handleStartChange}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <label className="error">{endError}</label>
              <label className="to">To</label>
              <DatePicker
                minDate={moment()}
                value={moment(endDate)}
                onChange={(val) => {
                  setEndDate(val);
                  setGlobalState({
                    ...globalState,
                    endDateTime: val,
                  });
                }}
                onClose={handleEndChange}
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Form.Field>
              <Button
                type="submit"
                onClick={fetchAvailableRoom}
                disabled={startError || endError}
                primary
              >
                Book
              </Button>
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <BookingModal roomsData={globalState.availableRooms} />
      <BookingTable />
    </Form>
  );
};

export default BookingForm;
