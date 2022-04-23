import React, { Component } from "react";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ColouredBox from "./ColouredBox";
import _ from "lodash";

class CardDetails extends Component {
  constructor(props) {
    super(props);
    const mID = props.mId;
    this.URLs = {
      getCardDetails: `http://localhost:8000/members/${mID}/carddetails`,
      getCheckedoutBooks: (CID) =>
        `http://localhost:8000/members/${CID}/checkoutbooks`,
    };
    this.state = {
      apir: {
        cardDetails: {
          completed: false,
          errored: false,
          response: null,
        },
        checkedOutBooks: {
          completed: false,
          errored: false,
          response: null,
        },
      },
    };
  }

  async componentDidMount() {
    let r = await fetch(this.URLs.getCardDetails);
    if (!r.ok) {
      this.setState((prevState, props) =>
        _.merge(
          {
            apir: {
              cardDetails: {
                errored: true,
                completed: true,
              },
            },
          },
          prevState
        )
      );
    } else {
      r = await r.json();
      this.setState((prevState, props) =>
        _.merge(prevState, {
          apir: {
            cardDetails: {
              response: r[0],
              completed: true,
            },
          },
        })
      );
    }
    r = await fetch(this.URLs.getCheckedoutBooks(r[0].CID));
    if (!r.ok) {
      this.setState({
        apir: {
          checkedOutBooks: {
            errored: true,
            completed: true,
          },
        },
      });
    } else {
      r = await r.json();
      this.setState((prevState, props) =>
        _.merge(prevState, {
          apir: {
            checkedOutBooks: {
              completed: true,
              response: r,
            },
          },
        })
      );
    }
    console.log(this.state);
  }

  render() {
    return this.state.apir.cardDetails.completed &&
      this.state.apir.checkedOutBooks.completed ? (
      <Grid container direction={"row"} spacing={2} sx={{ marginLeft: "1vw" }}>
        <Grid item xs={4}>
          <Paper elevation={24} square>
            <Grid container direction={"column"} spacing={1}>
              <Grid item sx={{ marginLeft: "0.4vw" }}>
                <Grid container direction="row" alignItems={"center"}>
                  <Grid item>
                    <Typography variant="h8">Card ID : {"   "}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" sx={{ color: "blue" }}>
                      {this.state.apir.cardDetails.response.CID}
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
                        text: this.state.apir.cardDetails.response.CARDSTATUS,
                        subtext: "Card Status",
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <ColouredBox
                      {...{
                        text: this.state.apir.cardDetails.response
                          .CARDISSUEDATE,
                        subtext: "Issue Date",
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <ColouredBox
                      {...{
                        text: this.state.apir.cardDetails.response
                          .CARDEXPIRYDATE,
                        subtext: "Expiry Date",
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={24} square>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#9696a1", marginLeft: "0.2em" }}
            >
              Checked-out books
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ISBN</TableCell>
                    <TableCell>Book Title</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Issued By</TableCell>
                    <TableCell>Issue Date</TableCell>
                    <TableCell>Return Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.apir.checkedOutBooks.response.map(
                    (bookDetails) => {
                      return this.renderBook(bookDetails);
                    }
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    ) : null;
  }
  renderBook = (bookDetails) => {
    return (
      <TableRow key={bookDetails.ISBN}>
        <TableCell>{bookDetails.ISBN}</TableCell>
        <TableCell>{bookDetails.BOOKTITLE}</TableCell>
        <TableCell>{bookDetails.AUTHORNAME}</TableCell>
        <TableCell>{bookDetails.ISSUER_NAME}</TableCell>
        <TableCell>{bookDetails.ISSUEDATE}</TableCell>
        <TableCell>{bookDetails.RETURNDATE}</TableCell>
      </TableRow>
    );
  };
}

export default CardDetails;
