import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Typography, TextField, Grid } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

export default function CheckoutSteps() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [mobile, setMobile] = React.useState("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getSteps() {
    return ["LOGIN", "ADDRESS", "ORDER SUMMARY", "PAYMENT OPTIONS"];
  }

  const getLoginStep = (set) => {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            Customer Infomation
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Full Name"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              variant="outlined"
              margin="normal"
              fullWidth
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              label="Mobile Number"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
            />
          </Grid>
        </Grid>
      </div>
    );
  };

  const getAddressStep = () => {
    return <div>Address steps</div>;
  };

  const getSummaryStep = () => {
    return <div>Summary steps</div>;
  };

  const getpaymentDetailsStep = () => {
    return <div>Payment steps</div>;
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return getLoginStep();
      case 1:
        return getAddressStep();
      case 2:
        return getSummaryStep();
      case 3:
        return getpaymentDetailsStep();
      default:
        return "Unknown step";
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
