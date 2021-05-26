import React from "react";
import { Tab } from "semantic-ui-react";
import BookingForm from "../BookingForm/BookingForm";
import EmployeeTable from "../EmployeeTable/EmployeeTable";
import RoomTable from "../RoomTable/RoomTable";
import InfoModal from "../InfoModal/InfoModal";
import RemoveBookingTable from "../RemoveBookingTable/RemoveBookingTable";
import "./TabMenuItem.css";

const panes = [
  {
    menuItem: {
      key: "booking",
      icon: "calendar alternate",
      content: "Booking",
    },
    render: () => (
      <Tab.Pane>
        <BookingForm />

        <InfoModal />
      </Tab.Pane>
    ),
  },
  {
    menuItem: {
      key: "remove-booking",
      icon: "edit",
      content: "Manage Booking",
    },
    render: () => (
      <Tab.Pane>
        <RemoveBookingTable />
        <InfoModal />
      </Tab.Pane>
    ),
  },
  {
    menuItem: { key: "employee", icon: "users", content: "Employees" },
    render: () => (
      <Tab.Pane>
        <EmployeeTable />
        <InfoModal />
      </Tab.Pane>
    ),
  },
  {
    menuItem: { key: "room", icon: "folder open", content: "Rooms" },
    render: () => (
      <Tab.Pane>
        <RoomTable />
      </Tab.Pane>
    ),
  },
];

const TabMenuItem = () => <Tab panes={panes} />;

export default TabMenuItem;
