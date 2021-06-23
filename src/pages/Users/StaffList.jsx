import React, { useState, useEffect } from "react";
import { Table, Header, Icon, Button } from "semantic-ui-react";
import StaffService from "../../../services/staffService";

export default function StaffList() {
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    let staffService = new StaffService();
    staffService.getStaffs().then((result) => setStaffs(result.data.data));
  }, []);
  return (
    <div>
      <Header as="h2">
        <Icon name="list alternate outline" />
        <Header.Content>Sistem Personeli</Header.Content>
      </Header>
      <Table color="blue" key="blue">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>İsim</Table.HeaderCell>
            <Table.HeaderCell>Soyisim</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Detay</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {staffs.map((staff) => (
            <Table.Row key={staff.id}>
              <Table.Cell>{staff.firstName}</Table.Cell>
              <Table.Cell>{staff.lastName}</Table.Cell>
              <Table.Cell>{staff.email}</Table.Cell>
              <Table.Cell>
                <Button>Görüntüle</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
