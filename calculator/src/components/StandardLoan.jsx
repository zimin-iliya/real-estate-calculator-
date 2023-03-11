import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";

const StandardLoan = () => {
  const {
    uniqueYears,
    uniqueMonths,
    monthlyLoan,
    LoanData,
    setLoanData,
    LoanData2, setLoanData2,
  } = useContext(DataContext);

  function handleSubmit(e) {
    e.preventDefault();

  }

  return (
    <div>
      <Box className="loantop" component="form" noValidate autoComplete="off">
        <TextField
          sx={{
            width: 200,
            m: 1,
            fontSize: 14,
            bgcolor: "background.paper",
          }}
          onChange={(e) =>
            setLoanData({ ...LoanData, Amount: e.target.value })
          }
          type="number"
          id="outlined-basic"
          label="Amount"
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
            setLoanData({ ...LoanData, numberOfMonths: e.target.value })
          }
          id="outlined-basic"
          label="Number of months"
          variant="filled"
        />
      </Box>
      <Box
        className="container2"
        component="form"
        noValidate
        autoComplete="off"
      >
        <select
          onChange={(e) =>
            setLoanData({ ...LoanData, startYear: e.target.value })
          }
        >
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          onChange={(e) =>
            setLoanData({ ...LoanData, startMonth: e.target.value })
          }
        >
          {uniqueMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <p>Start Loan on - </p>
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
          Calculate Loan
        </Button>
        {/* <p>{uniqueData}</p> */}
      </Box>
      <div className="container">
        <p>{monthlyLoan}$</p>
      </div>
    </div>
  );
};

export default StandardLoan;
