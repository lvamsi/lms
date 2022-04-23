import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { Component } from "react";

class LibrarianOverdueBooks extends Component {
  constructor() {
    super();
    this.URLs = {
      overduebooks: "http://localhost:8000/misc/overduebooks",
    };
    this.state = {
      overduebooksAPIr: {
        completed: false,
        errored: false,
        response: null,
      },
    };
  }

  handleGetOverdueBooks = async () => {
    try {
      let r = await fetch(this.URLs.overduebooks);
      if (!r.ok || (r.status >= 400 && r.status <= 600)) {
        throw new Error("Unable to get overdue books", r);
      } else {
        r = await r.json();
        this.setState({
          overduebooksAPIr: {
            completed: true,
            errored: false,
            response: r,
          },
        });
      }
    } catch {
      this.setState({
        overduebooksAPIr: {
          completed: false,
          errored: true,
          response: null,
        },
      });
    }
  };

  render() {
    return (
      <Paper square elevation={24} sx={{ marginLeft: "2vw", maxWidth: "80vw" }}>
          <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#9696a1",
            marginLeft: "1rem",
            marginTop: "1rem",
          }}
        >
          {"Overdue Books"}
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ width: "80%", marginTop: "2rem",marginLeft:"10%",marginBottom:"2rem" }}
          onClick={this.handleGetOverdueBooks}
        >
          Lookup overdue books
        </Button>
        {this.state.overduebooksAPIr.completed &&
        this.state.overduebooksAPIr.response ? (
          <OverDueBookDetails
            bookdetails={this.state.overduebooksAPIr.response}
          />
        ) : null}
      </Paper>
    );
  }
}

function OverDueBookDetails(props) {
  let bookdetails = props.bookdetails;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ISBN</TableCell>
          <TableCell>Book Title</TableCell>
          <TableCell>Author</TableCell>
          <TableCell>Issue Date</TableCell>
          <TableCell>Issuer</TableCell>
          <TableCell>Borrower</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bookdetails.map((bookdetail) => {
          return (
            <TableRow>
              <TableCell>{bookdetail.ISBN}</TableCell>
              <TableCell>{bookdetail.BOOKTITLE}</TableCell>
              <TableCell>{bookdetail.AUTHORNAME}</TableCell>
              <TableCell>{bookdetail.ISSUEDATE}</TableCell>
              <TableCell>{bookdetail.ISSUER_NAME}</TableCell>
              <TableCell>{bookdetail.BORROWER_NAME}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default LibrarianOverdueBooks;
