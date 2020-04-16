import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
  createStyles({
    root: {
      flexGrow: 1,
      overflowX: "hidden",
      overflowY: "hidden"
    },
    paper: {
      flexGrow: 1,
      width: 50,
      height: 200
    }
  });
});

const Medicines = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        {[1, 2, 3, 4, 5, 6, 7].map((each, id) => (
          <Grid item xs={4} key={id}>
            {/* <CardItem data={each}/> */}
            <Paper className={classes.paper} key={id}>
              Medidicne {id}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Medicines;
