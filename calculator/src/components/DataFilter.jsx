import React from "react";
import UserData from ".././../data/data";
import Button from "@mui/material/Button";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";

const data = UserData;
const uniqueMonths = [...new Set(data.map((obj) => obj.month))];
const uniqueYears = [...new Set(data.map((obj) => obj.year))];
const uniqueIds = [...new Set(data.map((obj) => obj.id))];
const DataFilter = () => {
  const { ContextRevenue, setContextRevenue } = useContext(DataContext);

  const [uniqueData, setUniqueData] = React.useState({});
  
  const [Revenue, setRevenue] = React.useState({
    id: "",
    month: "",
    year: "",
    nightly_price: "",
    occupancy_rate: "",
  });
  const monthlyRevenue =
    ContextRevenue?.occupancy_rate * ContextRevenue?.nightly_price * 30;

  function sbmitData() {
    const filterData = data.filter((obj, index, self) => {
      return (
        obj.id == Revenue.id &&
        obj.year == Revenue.year &&
        obj.month == Revenue.month &&
        index ===
          self.findIndex(
            (t) =>
              t.id === obj.id && t.year === obj.year && t.month === obj.month
          )
      );
    });

    const chosenData = data.reduce((objA, objB) => {
      if (
        objB.id == Revenue.id &&
        objB.year == Revenue.year &&
        objB.month == Revenue.month
      ) {
        return objB;
      }

      return objA;
    });

    setContextRevenue(chosenData);
  }

  return (
    <div>
      <h2>Revenue for month </h2>
      <select
        onChange={(e) => setRevenue({ ...Revenue, year: e.target.value })}
      >
        {uniqueYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => setRevenue({ ...Revenue, month: e.target.value })}
      >
        {uniqueMonths.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select onChange={(e) => setRevenue({ ...Revenue, id: e.target.value })}>
        {uniqueIds.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
      <div>
        <p>Price for one night - {ContextRevenue?.nightly_price}$</p>
        <p>
          Revenue for the month{" - "}
          {Math.floor(monthlyRevenue)}$
        </p>
      </div>
      <Button
        sx={{
          color: "black",
          backgroundColor: "#d5dbdd",
        }}
        onClick={sbmitData}
        size="small"
      >
        Calculate Revenue
      </Button>
    </div>
  );
};

export default DataFilter;
