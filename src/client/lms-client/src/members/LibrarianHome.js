import React, { Component, Fragment } from "react";
import { Box, Grid } from "@mui/material";
import CustomAppBar from "./AppBar";
import LibrarianIssueBooks from "./LibrarianIssueBooks";
import LibrarianOverdueBooks from "./LibrarianOverdueBooks";
import LibrarianCardSearch from "./LibrarianCardSearch";
import LibrarianAddPublisher from "./LibrarianAddPublisher";
import LibrarianAddBook from "./LibrarianAddBook";

class LibrarianHome extends Component {
  constructor() {
    super();
    this.state = {
      name: "Peter P",
      empno: "10",
    };
  }

  render() {
    return (
      <Fragment>
        <CustomAppBar username={this.state.name} />
        <br />
        <br />
        <Grid
          container
          direction="row"
          spacing={1}
          justifyContent="space-around"
        >
          <Grid item xs={7}>
            <LibrarianIssueBooks empno={this.state.empno} />
            <br />
            <br />
            <LibrarianOverdueBooks />
          </Grid>
          <Grid item xs={4}>
            <Grid container direction={"column"} spacing={3}>
              <Grid item>
                <LibrarianCardSearch empno={this.state.empno} />
              </Grid>
              <Grid item>
                <LibrarianAddPublisher />
              </Grid>
              <Grid item>
                  <LibrarianAddBook />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <br />
      </Fragment>
    );
    // Get card details
    // Book inventory management
    //
  }
}

export default LibrarianHome;
