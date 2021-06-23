import React from "react";
import { Grid } from "semantic-ui-react";
import Section from "./Section";
import SideBar from "./SideBar";
import { Route } from "react-router";
import JobAdverts from "../pages/JobAdvert/JobAdverts";
import JobPositionList from "../pages/JobAdvert/JobPositionList";
import EmployerList from "../pages/Users/EmployerList";
import CandidateList from "../pages/Users/CandidateList";
import AddJobAdv from "../pages/JobAdvert/AddJobAdv";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <SideBar/>
          </Grid.Column>
          <Grid.Column width={13}>
            <Route exact path="/" component={JobAdverts} />
            <Route path="/jobpositions" component={JobPositionList} />
            <Route exact path="/employers" component={EmployerList} />
            <Route exact path="/candidates" component={CandidateList} />
            <Route exact path="/addjobadv" component={AddJobAdv} />
            <Section/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
