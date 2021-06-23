import React, { useState, useEffect } from "react";
import { Table, Button, Header, Icon } from "semantic-ui-react";
import JobAdvertService from "../../services/jobAdvertService";

export default function JobAdverts() {
  const [adverts, setAdverts] = useState([]);
  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService
      .getJobAdverts()
      .then((result) => setAdverts(result.data.data));
  }, []);

  return (
    <div>
      <Header as="h2">
        <Icon name="list alternate outline" />
        <Header.Content>İş İlanları</Header.Content>
      </Header>
      <Table color="blue" key="blue">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Pozisyon</Table.HeaderCell>
            <Table.HeaderCell>Şirket Ünvanı</Table.HeaderCell>
            <Table.HeaderCell>Şehir</Table.HeaderCell>
            <Table.HeaderCell>Personel Sayısı</Table.HeaderCell>
            <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
            <Table.HeaderCell>İş Durumu</Table.HeaderCell>
            <Table.HeaderCell>Detay</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {adverts.map((advert) => (
            <Table.Row key={advert.id}>
              <Table.Cell>{advert.job.position}</Table.Cell>
              <Table.Cell>{advert.employer.companyName}</Table.Cell>
              <Table.Cell>{advert.city.name}</Table.Cell>
              <Table.Cell>{advert.openPosition}</Table.Cell>
              <Table.Cell>{advert.deadline}</Table.Cell>
              <Table.Cell>{advert.active.toString()}</Table.Cell>
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
