import React, { Component, Fragment } from "react";
import { Box, Typography } from "@mui/material";
import CustomAppBar from "./AppBar";
import LibrarianBookSearch from "./LibrarianBookSearch";

class LibrarianIssueBooks extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Fragment>
        <LibrarianBookSearch {...this.props}/>           
      </Fragment>
    );
  }



}

export default LibrarianIssueBooks;
