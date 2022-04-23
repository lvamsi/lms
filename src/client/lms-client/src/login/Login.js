import React, { Component } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import LMSImage from "../images/lms.jpg";
import StaffImage from "../images/staff.jpg";
import MemberImage from "../images/member.png";

class Login extends Component {
  render() {
    return (
      <Box
        sx={{ width: "85vw", minHeight: "100vh" }}
        display="flex"
        alignItems={"center"}
        textAlign="center"
        justifyContent={"center"}
        m={"auto"}
      >
        <Grid container direction="row">
          <Grid item xs={6}>
            <Paper>
              <Typography>Library Management System</Typography>
              <img src={LMSImage} width="400em" height="486em"></img>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            {this.loginForm()}
          </Grid>
        </Grid>
      </Box>
    );
  }
  selectType = () => {
    return (
      <Grid container direction="row" spacing={1} justifyContent="center">
        {/* <Typography>Select Login  Type</Typography> */}
        <Grid item xs={6}>
          <Paper justifyContent="center" sx={{ padding: "5%" }}>
            <Typography>Staff</Typography>
            <img src={StaffImage} width="200em" height="200em"></img>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper justifyContent="center" sx={{ padding: "5%" }}>
            <Typography>Member</Typography>
            <img src={MemberImage} width="200em" height="200em"></img>
          </Paper>
        </Grid>
      </Grid>
    );
  };

  loginForm = () => {
    return (
      <Paper justifyContent="center" sx={{ padding: "3%" }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>{this.selectType()}</Grid>
          <Grid item>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="User Name"
              type="email"
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField margin="dense" id="name" label="Password" fullWidth />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" fullWidth size="large">
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  };
}

export default Login;
