import React, { useContext } from "react";
import { useState } from "react";
import UserData from "../data/data";

const Data = UserData;
const uniqueMonths = [...new Set(Data.map((obj) => obj.month))];
const uniqueYears = [...new Set(Data.map((obj) => obj.year))];
const uniqueIds = [...new Set(Data.map((obj) => obj.id))];

export const DataContext = React.createContext(null);


const DataContextProvider = ({ children }) => {
  const [ContextRevenue, setContextRevenue] = useState({});
  const [LoanData, setLoanData] = useState({
    Amount: "0",
    numberOfMonths: "0", 
    startYear: "0",
    startMonth: "0",
  });
  


  const monthlyLoan = LoanData?.Amount / LoanData?.numberOfMonths;




  return (
    <DataContext.Provider
      value={{
        ContextRevenue,
        setContextRevenue,
        uniqueYears,
        uniqueMonths,
        monthlyLoan,
        LoanData, setLoanData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContextProvider;
