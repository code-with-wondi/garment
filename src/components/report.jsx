import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./Report.css";
import Header from "./Heaer";

const Report = () => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    // Fetch the amount whenever selectedType, selectedCategory, or selectedDate changes
    fetchAmount();
  }, [selectedType, selectedCategory, selectedDate]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSelectedCategory(""); // Reset category when type changes
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  const fetchAmount = async () => {
    if (selectedType && selectedCategory && selectedDate) {
      const querySnapshot = await getDocs(
        query(
          collection(db, "items"),
          where("option", "==", selectedType),
          where("subOption", "==", selectedCategory),
          where("date", "==", selectedDate.toISOString().split("T")[0])
        )
      );

      if (!querySnapshot.empty) {
        const existingAmount = querySnapshot.docs[0].data().amount;
        setAmount(existingAmount.toString()); // Set the fetched amount
      } else {
        setAmount("Amount not found"); // Display a message if no matching data is found
      }
    } else {
      setAmount(""); // Reset the amount if any of the selections are empty
    }
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="report-container">
          <h2 className="report-title">Report Form</h2>
          <div>
            <label>Select Type:</label>
            <select
              className="report-select"
              value={selectedType}
              onChange={handleTypeChange}
            >
              <option value="">Select a type</option>
              <option value="mg">MG</option>
              <option value="cotton">Cotton</option>
              <option value="hoodie">Hoodie</option>
              <option value="kids">Kids</option>
              <option value="roll">Roll</option>
              <option value="sewing">Sewing</option>
              <option value="merch">Merch</option>
              <option value="inks">Inks</option>
              <option value="wearables">Wearables</option>
              <option value="paper">Paper</option>
              <option value="others">Others</option>
            </select>
          </div>
          {selectedType && (
            <div>
              <label>Select Category:</label>
              <select
                className="report-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select a category</option>
                {selectedType === "cotton" && (
                  <>
                    <option value="fullseleve">Full Sleeve</option>
                    <option value="halfseleve">Half Sleeve</option>
                    <option value="polo">Polo</option>
                  </>
                )}
                {selectedType === "mg" && (
                  <>
                    <option value="fullseleve">Full Seleve</option>
                    <option value="halfseleve">Half Seleve</option>
                    <option value="polo">Polo</option>
                  </>
                )}
                {selectedType === "hoodie" && (
                  <>
                    <option value="withcap">With Cap</option>
                    <option value="withoutcap">Without Cap</option>
                  </>
                )}
                {selectedType === "kids" && (
                  <>
                    <option value="2year">2 Year</option>
                    <option value="4year">4 Year</option>
                    <option value="6year">6 Year</option>
                    <option value="8year">8 Year</option>
                    <option value="10year">10 Year</option>
                  </>
                )}
                {selectedType === "roll" && (
                  <>
                    <option value="rollpolyster">Roll polyster</option>
                    <option value="rollmg">Roll MG</option>
                    <option value="rollcotton">Roll Cotton</option>
                    <option value="rollpolycottonr">Roll Polycotton</option>
                    <option value="rollpaper">Roll Paper</option>
                    <option value="rollSattin">Roll Sattin</option>
                  </>
                )}
                {selectedType === "sewing" && (
                  <>
                    <option value="niddleoverlock">Niddle Overlock</option>
                    <option value="niddleinterlock">Niddle Interlock</option>
                    <option value="oilinliter">Oil in Liter</option>
                    <option value="whitethreads">White Threads</option>
                    <option value="redthreads">Red Threads</option>
                    <option value="blackthreads">Black Threads</option>
                    <option value="yellowthreads">Yellow Threads</option>
                    <option value="bluethreads">Blue Threads</option>
                  </>
                )}
                {selectedType === "merch" && (
                  <>
                    <option value="cap">Cap</option>
                    <option value="mug">Mug</option>
                    <option value="circlestamp">Circle Stamp</option>
                    <option value="rectanglestamp">Rectangle Stamp</option>
                    <option value="paper80gsm">Paper 80gsm</option>
                    <option value="blacksublimationink">
                      Black Sublimation ink
                    </option>
                    <option value="whitesublimationink">
                      Magneta Sublimation ink
                    </option>
                    <option value="yellowsublimationink">
                      Yellow Sublimation ink
                    </option>
                    <option value="magnetasublimationink">
                      Cyan Sublimation ink
                    </option>
                  </>
                )}
                {selectedType === "inks" && (
                  <>
                    <option value="blackplastic">Black Plastic</option>
                    <option value="whiteplastic">White Plastic</option>
                    <option value="yellowplastic">Yellow Plastic</option>
                    <option value="blueplastic">Blue Plastic</option>
                    <option value="silverplastic">Silver Plastic</option>
                    <option value="goldplastic">Gold Plastic</option>
                    <option value="binder">Binder</option>
                  </>
                )}
                {selectedType === "wearables" && (
                  <>
                    <option value="rivan">Rivan</option>
                    <option value="necktag">Neck Tag</option>
                    <option value="shortkir">Short kir</option>
                    <option value="shortplastic">Short plastic</option>
                    <option value="tshirtfestal">Tshirt Festal</option>
                    <option value="goldplastic">Gold Plastic</option>
                    <option value="vest">Vest</option>
                  </>
                )}
                {selectedType === "paper" && (
                  <>
                    <option value="stamp">Stamp</option>
                    <option value="a4">A4</option>
                    <option value="role">Role</option>
                  </>
                )}
                {selectedType === "others" && (
                  <>
                    <option value="mayandcape">May and cape</option>
                    <option value="elink">E Link</option>
                    <option value="mlink">M Link</option>
                    <option value="ylink">Y Link</option>
                    <option value="klink">K Link</option>
                  </>
                )}
              </select>
            </div>
          )}
          <div>
            <label>Select Date:</label>
            <input
              className="report-date"
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={handleDateChange}
            />
          </div>
          <div>
            <label>Amount:</label>
            <input
              className="report-amount"
              type="text"
              value={amount === null ? "" : amount}
              readOnly
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
