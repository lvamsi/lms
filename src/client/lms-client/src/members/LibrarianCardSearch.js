import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import LibrarianCardSearchDetailsDialog from "./LibrarianCardSearchDetailsDialog";

class LibrarianCardSearch extends Component {
  constructor() {
    super();
    this.state = {
      dialogOpen: false,
      cardDetailsAPIr: {
        completed: false,
        errored: false,
        response: null,
      },
      CID: "",
    };
    this.URLs = {
      carddetails: (CID) =>
        `http://localhost:8000/misc/librariancidsearch?CID=${CID}`,
    };
  }

  handleCardDetailsChange = (e) => {
    this.setState({ CID: e.target.value });
  };

  handleSearchButtonClick = async () => {
    this.fetchCardDetails();
    this.openDialog();
  };

  fetchCardDetails = async () => {
    let CID = this.state.CID;
    let URL = this.URLs.carddetails(CID);
    try {
      let r = await fetch(URL);
      if (!r.ok || (r.status >= 400 && r.status <= 600)) {
        throw new Error("Couldn't fetch data", r);
      }
      r = await r.json();
      this.setState({
        cardDetailsAPIr: {
          completed: true,
          errored: false,
          response: r,
        },
      });
    } catch (e) {
      console.error(e);
      alert("Couldn't fetch card details");
      this.setState({
        cardDetailsAPIr: {
          completed: false,
          errored: true,
          response: null,
        },
      });
    }
  };

  openDialog = () => {
    this.setState({
      dialogOpen: true,
    });
  };

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  render() {
    return (
      <Paper square elevation={24}>
        <Box sx={{ padding: "1rem" }}>
          <Typography
            variant="h7"
            sx={{
              fontWeight: "bold",
              color: "#9696a1",
              marginLeft: "0.4em",
              marginTop: "0.4em",
              marginBottom: "1rem",
            }}
          >
            Get card details
          </Typography>
          <Grid container direction="row">
            <Grid item xs={8}>
              <TextField label="Card Number" fullWidth onChange={this.handleCardDetailsChange} />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ height: "100%" }}
                endIcon={<SearchIcon />}
                onClick={this.handleSearchButtonClick}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
        {this.state.cardDetailsAPIr.completed &&
        !this.state.cardDetailsAPIr.errored ? (
          <LibrarianCardSearchDetailsDialog
            open={this.state.dialogOpen}
            handleDialogClose={this.handleDialogClose}
            data = {this.state.cardDetailsAPIr.response}
            empno = {this.props.empno}
          />
        ) : null}
      </Paper>
    );
  }
}

export default LibrarianCardSearch;
