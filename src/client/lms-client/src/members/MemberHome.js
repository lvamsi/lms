import React, { Component, Fragment } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardDetails from "./CardDetails";
import CustomAppBar from "./AppBar";
import BookSearch from "./BookSearch";

class MemberHome extends Component {
  constructor() {
    super();
    this.state = {
        'name' : 'Peter P',
        'mId' : '1011'
    }
  }

  render() {
    return (
      <Fragment>
        <CustomAppBar username={this.state.name}/>
        <br />
        <CardDetails mId={this.state.mId} />
        <br />
        <br />
        <BookSearch />
        <br />
        <br />
      </Fragment>
    );
  }
}

export default MemberHome;
