import { useEffect, useState } from "react";
import LineChart from "./components/LineChart";
import DataFilter from "./components/DataFilter";
import Loan from "./components/Loan";
import UserData from "../data/data";
import StandardLoan from "./components/StandardLoan";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";

const Data = UserData;
const uniqueMonths = [
  ...new Set(
    Data.map((obj) => `${obj.year}-${obj.month}-01`)
  ),
];
function padZero(num) {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
}

const uniqueM = uniqueMonths.map((obj) => {
  const [year, month, day] = obj.split('-');

  const formattedDate = `${year}-${padZero(month)}-${day}`;
  return { date: formattedDate };
});


const uniqueYears = [...new Set(Data.map((obj) => obj.year))];
const uniqueIds = [...new Set(Data.map((obj) => obj.id))];

function App() {
  const {  ContextRevenue,monthlyLoan,LoanData,  } = useContext(DataContext);



  const propertyId = ContextRevenue?.id;

  const [userData, setUserData] = useState({
    labels: uniqueMonths,
    datasets: [],
  });

  useEffect(() => {
    if (propertyId) {

      let revenueData = Data.filter((obj) => obj.id == propertyId).map((data) =>
        Math.floor(data.occupancy_rate * data.nightly_price * 30)
      )

      let expansesData, balanceData;

      var loan=true;
      if(loan){
        // TODO: insert logic to build expanses data array
        // example: [0,0,0,0,200,200,200,200,200,0,0,0,0,0,0,0]
        
        // const revenueData = [2200,122,334,0,0,1000,1500,400,0,0,0,2000,2500,2500,2400,1800,22];
  
        expansesData = uniqueM.map((month, index) => {
          const uniqueMonthsParse = parseInt(month);
          const date = new Date(`${LoanData.startYear}-${padZero(LoanData.startMonth)}-01`);
          const endMonth = parseInt(padZero(LoanData.numberOfMonths))
          const endPoint =  new Date(date)
          const allMonths = new Date(month.date)
          endPoint.setMonth(date.getMonth() + endMonth);
          
          

          
          if (allMonths >= date && endPoint >= allMonths ) {
            return monthlyLoan;
          } else {
            return 0;
          }
        });
//         returnLoan = 0;
// while(returnLoan<LoanData?.Amount){
  
        
        balanceData = revenueData.map((revenue, index) => revenue - (expansesData[index] ? expansesData[index] : 0));
      }

      let revenueDataSet = {
        label: "Revenue",
        data: revenueData,
        backgroundColor: ["#ecf0f1"],
        borderColor: "black",
        borderWidth: 2,
      };


      let expansesDataSet = {
        label: "Expanses",
        data: expansesData,
        backgroundColor: ["#ecf0f1"],
        borderColor: "red",
        borderWidth: 2,
      };

      let balanceDataSet = {
        label: "Balance",
        data: balanceData,
        backgroundColor: ["#ecf0f1"],
        borderColor: "green",
        borderWidth: 4,
      };

      setUserData({
        labels: uniqueMonths,
        datasets: [
          revenueDataSet,
          expansesDataSet,
          balanceDataSet
        ],
      });
    }
  }, [propertyId, LoanData]);


  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <DataFilter />
        </div>
        <div className="row">
          <Loan />
        </div>
        <div className="row">
          <StandardLoan />
        </div>
        <div className="row">
          <LineChart chartData={userData} />
        </div>
       
      </div>
    </div>
  );
}

export default App;
