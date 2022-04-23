import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { Box } from "@mui/system";
import React, { Component, Fragment, useState } from "react";
import ColouredBox from "./ColouredBox";

class LibrarianCardSearchDetailsDialog extends Component {
  constructor() {
    super();
  }

  handleClose = () => {
    this.props.handleDialogClose();
  };

  render() {
    return (
      <Dialog open={this.props.open} fullWidth maxWidth="md">
        <DialogTitle>Card Details</DialogTitle>
        <DialogContent>
          {this.props.data.carddetails ? (
            <CardDetails cardDetails={this.props.data.carddetails} />
          ) : (
            <Typography>Unable to fetch details.</Typography>
          )}
          {this.props.data.checkedoutbooks &&
          this.props.data.checkedoutbooks.length > 0 &&
          this.props.data.carddetails ? (
            <CheckedOutBooks
              bookDetails={this.props.data.checkedoutbooks}
              empno={this.props.empno}
              CID={this.props.data.carddetails.CID}
            />
          ) : (
            <Typography>No checked-out books found</Typography>
          )}
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

function CheckedOutBooks(props) {
  let bookDetails = props.bookDetails;
  const [returnBookAPIr, setReturnBookAPIr] = useState({
    completed: false,
    errored: false,
    response: null,
  });
  let handleReturnBook = async (ISBN) => {
    await executeReturnBookAPI(ISBN);
  };

  let executeReturnBookAPI = async (ISBN) => {
    let CID = props.CID;
    let EMPNO = props.empno;
    let URL = `http://localhost:8000/misc/returnbook?CID=${CID}&EMPNO=${EMPNO}&ISBN=${ISBN}`;
    try {
      let r = await fetch(URL);
      if (!r.ok || (r.status >= 400 && r.status <= 600)) {
        throw new Error("Error executing return book", r);
      }
      r = await r.json();
      setReturnBookAPIr({ completed: false, errored: true, response: r });
      alert("Return Successful");
    } catch (e) {
      console.error(e);
      setReturnBookAPIr({ completed: false, errored: true, response: null });
      alert("Couldn't return book successfully");
    }
  };

  return (
    <Box sx={{ marginTop: "3rem" }}>
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
        Checked-out Books
      </Typography>
      <TableContainer sx={{ width: "90%", margin: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ISBN</TableCell>
              <TableCell>Book Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Issuer Name</TableCell>
              <TableCell>Issue Date</TableCell>
              <TableCell>Return</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookDetails.map((searchResult) => {
              return (
                <TableRow key={searchResult.ISBN}>
                  <TableCell>{searchResult.ISBN}</TableCell>
                  <TableCell>{searchResult.BOOKTITLE}</TableCell>
                  <TableCell>{searchResult.AUTHORNAME}</TableCell>
                  <TableCell>{searchResult.ISSUER_NAME}</TableCell>
                  <TableCell>{searchResult.ISSUEDATE}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size={"small"}
                      onClick={() => {
                        handleReturnBook(searchResult.ISBN);
                      }}
                    >
                      Return Book
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default LibrarianCardSearchDetailsDialog;
