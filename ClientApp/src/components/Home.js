import React, { Component } from "react";
import { Dashboard } from "./Dashboard/Dashboard";
import { Header } from "./Header/Header";
import { getDashboard } from "../services/dashboardService";
import { WidgetHeader } from "./widgets/WidgetHeader";
import styled from "styled-components";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { queryId: {} };
  }
  displayName = Home.name;

  setQueryId = input => {
    this.setState({
      queryId: input
    });
  };

  render() {
    const dashboardConf = getDashboard("Client Relations");
    return (
      <div>
        <Header />
        <WidgetHeader style={{ zIndex: 10 }} text={dashboardConf.team} />
        <Dashboard
          queryId={this.state.queryId}
          size={dashboardConf.size}
          widgets={dashboardConf.widgets}
        ></Dashboard>
      </div>
    );
  }
}
