import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { Component, Fragment } from "react";

class LibrarianAddBook extends Component {
  constructor() {
    super();
    this.URLs = {
      getPublisherDetails: `http://localhost:8000/misc/getpublishers`,
      addBook : `http://localhost:8000/misc/addbook`
    };
    this.state = {
      publisherDetailsAPIr: {
        completed: false,
        errored: false,
        response: null,
      },
    };
  }

  async componentDidMount() {
    this.fetchPublisherDetails();
  }

  fetchPublisherDetails = async () => {
    try {
      let r = await fetch(this.URLs.getPublisherDetails);
      if (!r.ok || (r.status >= 400 && r.status <= 600)) {
        throw new Error("Error getting publisher info", r);
      }
      r = await r.json();
      this.setState({
        publisherDetailsAPIr: { completed: true, errored: false, response: r },
      });
    } catch (e) {
      console.error(e);
      this.setState({
        publisherDetailsAPIr: {
          completed: false,
          errored: true,
          response: null,
        },
      });
      alert("Couldn't get publisher data");
    }
  };

  handlePublisherSelectChange = (e)=>{
      this.setState({publisherSelectId:e.target.value})
  }

  handleTextFieldChange = (key,value)=>{
    this.setState({[key]:value});
  }

  handleAddBook = async()=>{
    let bodyParams = {
        ISBN : this.state.ISBN,
        title : this.state.title,
        pid: this.state.publisherSelectId,
        desc: this.state.desc,
        cpd: this.state.cpd,
        authorname:this.state.authorname,
        category:this.state.category
    };
    bodyParams = JSON.stringify(bodyParams);
    this.doAddBook(bodyParams);
  }

  doAddBook=async(bodyParams)=>{
    try {
        let r = await fetch(this.URLs.addBook, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: bodyParams,
        });
        if (!r.ok || (r.status >= 400 && r.status <= 600)) {
          throw new Error("Error executing add book", r);
        }
        r = await r.json();
        this.setState({addPublisherAPIr:{ completed: true, errored: false, response: r }});
        alert(r.message);
      } catch (e) {
        console.error(e);
        this.setState({addPublisherAPIr:{ completed: false, errored: true, response: null }});
        alert("Couldn't add book");
      }
  }

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
          {"Add Book"}
        </Typography>
        <Box sx={{ width: "80%", margin: "auto" }}>
          <Grid container direction="column" spacing={1}>
            <Grid item></Grid>
            <Grid item>
              <TextField
                label="ISBN"
                onChange={(e)=>{this.handleTextFieldChange('ISBN',e.target.value)}}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Title"
                onChange={(e)=>{this.handleTextFieldChange('title',e.target.value)}}
                fullWidth
              />
            </Grid>
            <Grid item>
                {this.renderPublisherSelect()}
            </Grid>
            <Grid item>
              <TextField
                label="Category"
                onChange={(e)=>{this.handleTextFieldChange('category',e.target.value)}}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                label="Desc"
                onChange={(e)=>{this.handleTextFieldChange('desc',e.target.value)}}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Charge per day"
                onChange={(e)=>{this.handleTextFieldChange('cpd',e.target.value)}}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Author name"
                onChange={(e)=>{this.handleTextFieldChange('authorname',e.target.value)}}
                fullWidth
              />
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                onClick={this.handleAddBook}
                fullWidth
              >
                Add Book
              </Button>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Box>
      </Paper>
    );
  }

  renderPublisherSelect = () => {
    return this.state.publisherDetailsAPIr.completed &&
      this.state.publisherDetailsAPIr.response ? (
      <FormControl fullWidth>
        <InputLabel id="publisher-select-label">Publisher</InputLabel>
        <Select
          labelId="publisher-select-label"
          id="publisher-select"
          label="Publisher"
          onChange={this.handlePublisherSelectChange}
        >
          {this.state.publisherDetailsAPIr.response.map((pubinfo) => {
            return <MenuItem key={pubinfo.PID} value={pubinfo.PID}>{pubinfo.PNAME}</MenuItem>;
          })}
        </Select>
      </FormControl>
    ) : null;
  };
}

export default LibrarianAddBook;
