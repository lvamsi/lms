import React, { Component } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

class ColouredBox extends Component {
  constructor() {
    super();
  }
  render() {
    const PROPS = this.props;
    return (
      <Grid container direction={"column"} spacing={1} alignContent={"center"} textAlign="center">
        <Grid item >
          <Box sx={{ backgroundColor: "green", padding: "1em" }} >
            <Typography
              variant="h7"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              {PROPS.text}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Typography sx={{ fontSize: "0.6rem" }}>
            {this.props.subtext}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default ColouredBox;
