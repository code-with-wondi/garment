import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./WeeklyReport.css";

const WeeklyReport = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [inputAmount, setInputAmount] = useState(0);
  const [outputAmount, setOutputAmount] = useState(0);

  useEffect(() => {
    // Function to fetch data and calculate weekly totals
    const fetchWeeklyData = async () => {
      const startDate = new Date(); // Adjust as needed for your week start
      startDate.setDate(startDate.getDate() - startDate.getDay()); // Start of the week (Sunday)
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + 6); // End of the week (Saturday)

      const querySnapshot = await getDocs(
        query(
          collection(db, "items"),
          where("date", ">=", startDate.toISOString().split("T")[0]),
          where("date", "<=", endDate.toISOString().split("T")[0])
        )
      );

      const weeklyReportData = [];
      let totalInputAmount = 0;
      let totalOutputAmount = 0;

      querySnapshot.forEach((doc) => {
        const item = doc.data();
        const itemKey = `${item.option}-${item.subOption}`; // Create a unique key for each item

        weeklyReportData.push({
          date: item.date, // Assuming you have a 'date' field in your documents
          option: item.option,
          subOption: item.subOption,
          amount: item.amount,
          inputAmount: item.inputAmount || 0, // Handle missing inputAmount
          outputAmount: item.outputAmount || 0, // Handle missing outputAmount
        });

        totalInputAmount += item.inputAmount || 0;
        totalOutputAmount += item.outputAmount || 0;
      });

      setWeeklyData(weeklyReportData);
      setInputAmount(totalInputAmount);
      setOutputAmount(totalOutputAmount);
    };

    fetchWeeklyData();
  }, []);

  // Function to get the day of the week in word format
  const getDayInWord = (dateString) => {
    const daysInWord = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return daysInWord[dayIndex];
  };

  // Function to format dates as Day Range
  const formatDayRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  };

  return (
    <div className="weekly-report-container">
      <h2>Weekly Report</h2>
      <table className="weekly-report-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Option</th>
            <th>Sub-Option</th>
            <th>Input Amount</th>
            <th>Output Amount</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {weeklyData.map((item, index) => (
            <tr key={index}>
              <td>{getDayInWord(item.date)}</td>
              <td>{item.date}</td>
              <td>{item.option}</td>
              <td>{item.subOption}</td>
              <td>{item.inputAmount}</td>
              <td>{item.outputAmount}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="4">Week Total:</td>
            <td>{inputAmount}</td>
            <td>{outputAmount}</td>
            <td>{inputAmount - outputAmount}</td>
          </tr>
        </tbody>
      </table>
      <button className="print-button" onClick={() => window.print()}>
        Print
      </button>
    </div>
  );
};

export default WeeklyReport;
