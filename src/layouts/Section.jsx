import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import JobAdverts from "../pages/JobAdvert/JobAdverts";
import JobPositionList from "../pages/JobAdvert/JobPositionList";
import CandidateList from "../pages/Users/CandidateList";
import EmployerList from "../pages/Users/EmployerList";

export default function Section() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <GridColumn size={13}><CandidateList /></GridColumn>
        </Grid.Row>
        <Grid.Row>
          <GridColumn size={13}><EmployerList /></GridColumn>
        </Grid.Row>
        <Grid.Row>
          <GridColumn size={13}><JobAdverts /></GridColumn>
        </Grid.Row>
        <Grid.Row>
          <GridColumn size={13}><JobPositionList /></GridColumn>
        </Grid.Row>
      </Grid>
    </div>
  );
}
