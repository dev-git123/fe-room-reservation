import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Table, Label } from "semantic-ui-react";
import { GlobalContext } from "../../App";
import moment from "moment";
import NoData from "../NoData/NoData";
import "./EmployeeTable.css";

const EmployeeTable = () => {
  const [globalState, setGlobalState] = useContext(GlobalContext);
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    return axios.get("http://localhost:8080/employees");
  };

  useEffect(() => {
    fetchEmployees().then((result) => {
      setEmployees(result.data);
      setGlobalState({ ...globalState, employees: result.data });
    });
  }, []);

  useEffect(() => {}, [globalState]);

  useEffect(() => {}, [employees]);

  return (
    <Table celled>
      {employees && employees?.length > 0 && (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Employee No.</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Department</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
            <Table.HeaderCell>DOB</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      )}
      {!employees && <NoData msg="No Record" />}
      <Table.Body>
        {employees?.map((x) => (
          <Table.Row key={x.id}>
            <Table.Cell>
              <Label>{x.employeeNo}</Label>
            </Table.Cell>
            <Table.Cell>
              {x.firstName} {x.lastName}
            </Table.Cell>
            <Table.Cell>{x.department == null ? "-" : x.department}</Table.Cell>
            <Table.Cell>{x.position == null ? "-" : x.position}</Table.Cell>
            <Table.Cell>
              {x.dateOfBirth == null
                ? "-"
                : moment(x.dateOfBirth).format("YYYY/MM/DD")}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default EmployeeTable;
