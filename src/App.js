import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import AccessibleForwardSharpIcon from "@material-ui/icons/AccessibleForwardSharp";
import Calculator from "./Components/Calculator.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <AccessibleForwardSharpIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Rabstvo jebanoe
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Calculator />
    </>
  );
}

export default App;
