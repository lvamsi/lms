import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { Component, Fragment, useState } from "react";
import ColouredBox from "./ColouredBox";

class LibrarianIssueBookDialog extends Component {
  constructor() {
    super();
    this.state = {
      cardNumber: null,
      cardDetailsAPIr: {
        completed: false,
        errored: false,
        response: null,
      },
      issueBookAPIr: {
        completed: false,
        errored: false,
        response: null,
      },
    };
    this.URLs = {
      getCardDetails: (CID) => `http://localhost:8000/misc/carddetails/${CID}`,
      issueBook: `http://localhost:8000/misc/issuebook`,
    };
  }

  handleClose = () => {
    this.props.onClose();
  };

  handleGetCardDetailsClick = async (cardNumber) => {
    this.setState({ cardNumber });
    this.getCardDetails(cardNumber);
  };

  handleFinalIssueBook = async () => {
    let CID =
      this.state.cardDetailsAPIr.completed && !this.state.cardDetailsAPIr.errored
        ? this.state.cardDetailsAPIr.response.CID
        : false;
    let MID =
      this.state.cardDetailsAPIr.completed && !this.state.cardDetailsAPIr.errored
        ? this.state.cardDetailsAPIr.response.MID
        : false;
    let params = {
      CID,
      MID,
      ISBN: this.props.selectedBookDetails.ISBN,
      empno: this.props.empno,
    };
    this.executeQueryBookAPI(params);
  };

  executeQueryBookAPI = async (params) => {
    try {
      let r = await fetch(
        this.URLs.issueBook + "?" + new URLSearchParams(params).toString()
      );
      if (!r.ok || (r.status >= 400 && r.status <= 600)) {
        throw new Error("Issue book unsuccessful", r);
      } else {
        r = await r.json();
        this.setState((prevState) => ({
          issueBookAPIr: {
            completed: true,
            response: r,
            errored: false,
          },
        }));
      }
    } catch (e) {
      console.error(e);
      this.setState((prevState) => ({
        issueBookAPIr: {
          completed: false,
          response: null,
          errored: true,
        },
      }));
    }
  };

  getCardDetails = async (cardNumber) => {
    try {
      let r = await fetch(this.URLs.getCardDetails(cardNumber));
      if (!r.ok || (r.status >= 400 && r.status <= 600)) {
        throw new Error("Bad response from server", r);
      } else {
        r = await r.json();
        this.setState((prevState) => ({
          cardDetailsAPIr: {
            completed: true,
            response: r,
            errored: false,
          },
        }));
      }
    } catch (error) {
      this.setState((prevState) => ({
        cardDetailsAPIr: {
          completed: false,
          response: null,
          errored: true,
        },
      }));
    }
  };

  render() {
    return !this.props.open ? null : (
      <Dialog open={this.props.open} fullWidth>
        <DialogTitle>Issue Book</DialogTitle>
        <DialogContent>
          <div>
            Issuing {this.props.selectedBookDetails.bookTitle} by{" "}
            {this.props.selectedBookDetails.authorName} (ISBN{" "}
            {this.props.selectedBookDetails.ISBN}){" "}
          </div>
          <br />
          <CardSearchForm onClick={this.handleGetCardDetailsClick} />
          <br />
          <br />
          {this.state.cardDetailsAPIr.completed ? (
            <Fragment>
              <CardDetails cardDetails={this.state.cardDetailsAPIr.response} />
              <Button
                variant="contained"
                colour="primary"
                size="large"
                fullWidth
                onClick={this.handleFinalIssueBook}
              >
                Issue Book{" "}
              </Button>
            </Fragment>
          ) : null}
          {this.state.issueBookAPIr.completed ? (
            <Fragment>
              <Typography color="primary" variant="h6">
                Successfully issued
              </Typography>
            </Fragment>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={this.handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

function CardSearchForm(props) {
  const [cardNumber, setCardNumber] = useState(-1);
  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };
  return (
    <Box>
      <Grid container direction={"row"}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label={"Enter card number"}
            onChange={handleCardNumberChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            sx={{ height: "100%" }}
            endIcon={<SearchIcon />}
            onClick={() => {
              props.onClick(cardNumber);
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

function CardDetails(props) {
  return (
    <Paper elevation={8} square>
      <Grid container direction={"column"} spacing={1}>
        <Grid item>
          <Grid container direction="row" alignItems={"center"}>
            <Grid item>
              <Typography variant="h8">Card ID : {"   "}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" sx={{ color: "blue" }}>
                {props.cardDetails.CID}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            spacing={1}
            justifyContent="center"
            alignContent={"center"}
          >
            <Grid item>
              <ColouredBox
                {...{
                  text: props.cardDetails.NAME,
                  subtext: "Name",
                }}
              />
            </Grid>
            <Grid item>
              <ColouredBox
                {...{
                  text: props.cardDetails.CARDSTATUS,
                  subtext: "Card Status",
                }}
              />
            </Grid>
            <Grid item>
              <ColouredBox
                {...{
                  text: props.cardDetails.CARDISSUEDATE,
                  subtext: "Issue Date",
                }}
              />
            </Grid>
            <Grid item>
              <ColouredBox
                {...{
                  text: props.cardDetails.CARDEXPIRYDATE,
                  subtext: "Expiry Date",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default LibrarianIssueBookDialog;
