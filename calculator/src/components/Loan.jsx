import React from "react";
import { Line } from "react-chartjs-2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";

const Loan = ({ chartData }) => {
  const [uniqueData, setUniqueData] = React.useState({});
  const [loanData, setLoanData] = useState({
    interestRate: "",
    presentValue: "",
    numberOfMonths: "",
    Amount: "",
    futureValue: "",
    beginningOfPeriod: "",
  });

  const PMT = (rate, nper, pv, fv, type) => {
    /*
     * rate   - interest rate per month
     * nper   - number of periods (months)
     * pv   - present value
     * fv   - future value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
     */
    let pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (rate === 0) return -(pv + fv) / nper;

    pvif = Math.pow(1 + rate, nper);
    pmt = (-rate * (pv * pvif + fv)) / (pvif - 1);

    if (type === 1) pmt /= 1 + rate;
    return setUniqueData(pmt);
  };

  //   let rate = (4 / 100) / 12; // 4% rate
  //   let nper = 30 * 12; //30 years in months
  //   let pv = -400000 * (1 - (3.5 / 100)); //3.5%

  // call the function
  //   PMT(rate, nper, pv, 0, 0)

  function handleSubmit(e) {
    e.preventDefault();
    PMT(
      loanData.interestRate,
      loanData.numberOfMonths,
      loanData.presentValue,
      0,
      0
    );
  }

  return (
    <div>
      <Box
        className="loantop"
        component="form"
        sx={{}}
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{
            width: 200,
            m: 1,
            fontSize: 14,
            bgcolor: "background.paper",
          }}
          onChange={(e) =>
            setLoanData({ ...loanData, presentValue: e.target.value })
          }
          type="number"
          id="outlined-basic"
          label="Present value"
          variant="filled"
        />
        <TextField
          sx={{
            width: 200,
            m: 1,
            fontSize: 14,
            bgcolor: "background.paper",
          }}
          type="number"
          onChange={(e) =>
            setLoanData({ ...loanData, interestRate: e.target.value })
          }
          id="outlined-basic"
          label="Interest rate per month"
          variant="filled"
        />
      </Box>
      <Box
        className="loanbottom"
        component="form"
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{
            width: 200,
            m: 1,
            fontSize: 14,
            bgcolor: "background.paper",
          }}
          type="number"
          onChange={(e) =>
            setLoanData({ ...loanData, numberOfMonths: e.target.value })
          }
          id="outlined-basic"
          label="Number of months"
          variant="filled"
        />
        <TextField
          sx={{
            width: 200,
            mx: 1,
            fontSize: 14,
            bgcolor: "background.paper",
          }}
          type="number"
          onChange={(e) => setLoanData({ ...loanData, Amount: e.target.value })}
          id="outlined-basic"
          label="Amount"
          variant="filled"
        />
      </Box>
      <Box className="container">
        <Button
          sx={{
            mr: 1,
            width: 300,
            color: "black",
            backgroundColor: "#d5dbdd",
          }}
          onClick={handleSubmit}
          fullWidth
          size="small"
        >
          Calculate mortgage
        </Button>
        {/* <p>{uniqueData}</p> */}
      </Box>
      <div className="container">
        <p>{``}</p>
      </div>
    </div>
  );
};

export default Loan;
