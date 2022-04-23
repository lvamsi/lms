import React, { Component, Fragment } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      searchResult: {
        completed: false,
        errored: false,
        response: null,
      },
    };
    this.URLs = {
      search: (searchKey) => `http://localhost:8000/search?q=${searchKey}`,
    };
  }

  handleChange = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  handleClick = async () => {
    console.log(this.state.searchInput);
    let q = this.state.searchInput;
    let r = await fetch(this.URLs.search(q));
    r = await r.json();
    this.setState({
      searchResult: { completed: true, errored: false, response: r },
    });
  };

  async componentDidMount() {}

  render() {
    return (
      <Paper square elevation={24} sx={{ marginLeft: "2vw", maxWidth: "80vw" }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>{this.renderSearchBar()}</Grid>
          {this.state.searchResult.completed ? <Grid item>{this.renderSearchResults(this.state.searchResult.response)}</Grid> : null}
        </Grid>
      </Paper>
    );
  }

  renderSearchBar = () => {
    return (
      <Box sx={{ margin: "2rem" }}>
        <Grid container direction={"row"}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              size={"large"}
              sx={{ height: "100%" }}
              endIcon={<SearchIcon />}
              onClick={this.handleClick}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  };

  renderSearchResults = (searchResults) => {
    return (
      <TableContainer component={Paper} sx={{width:'90%',margin:'auto'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ISBN</TableCell>
              <TableCell>Book Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Publisher</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.map((searchResult) => {
              return (
                <TableRow key={searchResult.ISBN}>
                  <TableCell>{searchResult.ISBN}</TableCell>
                  <TableCell>{searchResult.BOOKTITLE}</TableCell>
                  <TableCell>{searchResult.CATEGORY}</TableCell>
                  <TableCell>{searchResult.AUTHORNAME}</TableCell>
                  <TableCell>{searchResult.PNAME}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
}

export default BookSearch;
