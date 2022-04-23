import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Component, Fragment } from "react";

class LibrarianAddPublisher extends Component {
  constructor() {
    super();
    this.state = {
      pname: "",
      pplace: "",
      addPublisherAPIr: { completed: false, errored: true, response: null },
    };
    this.URLs = {
      addPublisher: "http://localhost:8000/misc/addpublisher",
    };
  }

  handlePublisherNameChange = (e) => {
    this.setState({ pname: e.target.value });
  };
  handlePublisherPlaceChange = (e) => {
    this.setState({ pplace: e.target.value });
  };

  handleAddPublisher = async () => {
    const pname = this.state.pname;
    const pplace = this.state.pplace;
    this.executeAddPublisher(pname, pplace);
  };

  executeAddPublisher = async (pname, pplace) => {
    try {
      let r = await fetch(this.URLs.addPublisher, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pname,pplace}),
      });
      if (!r.ok || (r.status >= 400 && r.status <= 600)) {
        throw new Error("Error executing return book", r);
      }
      r = await r.json();
      this.setState({addPublisherAPIr:{ completed: true, errored: false, response: r }});
      alert(r.message);
    } catch (e) {
      console.error(e);
      this.setState({addPublisherAPIr:{ completed: false, errored: true, response: null }});
      alert("Couldn't add publisher");
    }
  };

  render() {
    return (
      <Paper square elevation={24}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#9696a1",
            marginLeft: "0.4em",
            marginTop: "0.4em",
          }}
        >
          {"Add Publisher"}
        </Typography>
        <Box sx={{ width: "80%", margin: "auto" }}>
          <Grid container direction="column" spacing={1}>
            <Grid item></Grid>
            <Grid item>
              <TextField
                label="Publisher Name"
                onChange={this.handlePublisherNameChange}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Place"
                onChange={this.handlePublisherPlaceChange}
                fullWidth
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={this.handleAddPublisher}
                fullWidth
              >
                Add Publisher
              </Button>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Box>
      </Paper>
    );
  }
}

export default LibrarianAddPublisher;
