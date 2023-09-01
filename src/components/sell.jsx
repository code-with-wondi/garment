import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import "./Sell.css";
import Header from "./Heaer";

const Sell = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    // Initialize the form with the current option and sub-option values if needed
    // You can fetch this data from Firestore if you have a specific use case
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setSelectedSubOption("");
  };

  const handleSubOptionChange = (event) => {
    setSelectedSubOption(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSave = async () => {
    if (selectedOption && selectedSubOption && amount && selectedDate) {
      // Calculate the date one day before selectedDate
      const previousDate = new Date(selectedDate);
      previousDate.setDate(selectedDate.getDate() - 1);

      const previousDateString = previousDate.toISOString().split("T")[0];

      // Check if a document for the selected date exists
      const querySnapshot = await getDocs(
        query(collection(db, "items"), where("date", "==", previousDateString))
      );

      if (!querySnapshot.empty) {
        // Document for the previous date exists, update the amount
        const docRef = querySnapshot.docs[0].ref;
        const existingInputAmount = querySnapshot.docs[0].data().inputAmount;
        const inputAmountToAdd = parseInt(amount);

        // Add the inputAmountToAdd to the existing inputAmount
        const updatedInputAmount = existingInputAmount + inputAmountToAdd;

        // Update the existing document with the new input amount
        await updateDoc(docRef, {
          inputAmount: updatedInputAmount,
          amount: updatedInputAmount,
        });
      } else {
        // Document for the previous date doesn't exist, create a new document
        await addDoc(collection(db, "items"), {
          option: selectedOption,
          subOption: selectedSubOption,
          amount: parseInt(amount),
          inputAmount: parseInt(amount),
          date: previousDateString,
        });
      }

      setSelectedOption("");
      setSelectedSubOption("");
      setAmount("");
      setSelectedDate(new Date());

      console.log("Data saved to Firebase.");
    } else {
      alert("Please select an option, sub-option, date, and enter an amount.");
    }
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="sell-container">
          <h2 className="sell-title">Sell Form</h2>
          <div>
            <label>Select Type:</label>
            <select
              className="sell-select"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="">Select an type</option>
              <option value="mg">MG</option>
              <option value="cotton">Cotton</option>
              <option value="hoodie">Hoodie</option>
              <option value="kids">Kids</option>
              <option value="roll">Roll</option>
              <option value="sewing">Sewing</option>
              <option value="merch">Merch</option>
              <option value="inks">Inks</option>
              <option value="wearables">
                Wearables <b>Store 8</b>
              </option>
              <option value="paper">Paper</option>
              <option value="others">
                Ohers <b>Store 10</b>
              </option>
            </select>
          </div>
          {selectedOption && (
            <div>
              <label>Select Category:</label>
              <select
                className="input-select"
                value={selectedSubOption}
                onChange={handleSubOptionChange}
              >
                <option value="">Select a category</option>
                {selectedOption === "mg" && (
                  <>
                    <option value="fullseleve">Full Seleve</option>
                    <option value="halfseleve">Half Seleve</option>
                    <option value="polo">Polo</option>
                  </>
                )}
                {selectedOption === "cotton" && (
                  <>
                    <option value="fullseleve">Full Seleve</option>
                    <option value="halfseleve">Half Seleve</option>
                    <option value="polo">Polo</option>
                  </>
                )}
                {selectedOption === "hoodie" && (
                  <>
                    <option value="withcap">With cap</option>
                    <option value="withoutcap">Without cap</option>
                  </>
                )}
                {selectedOption === "kids" && (
                  <>
                    <option value="2year">2 Year</option>
                    <option value="4year">4 Year</option>
                    <option value="6year">6 Year</option>
                    <option value="8year">8 Year</option>
                    <option value="10year">10 Year</option>
                  </>
                )}
                {selectedOption === "roll" && (
                  <>
                    <option value="rollpolyster">Roll polyster</option>
                    <option value="rollmg">Roll MG</option>
                    <option value="rollcotton">Roll Cotton</option>
                    <option value="rollpolycottonr">Roll Polycotton</option>
                    <option value="rollpaper">Roll Paper</option>
                    <option value="rollSattin">Roll Sattin</option>
                  </>
                )}
                {selectedOption === "sewing" && (
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
                {selectedOption === "merch" && (
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
                {selectedOption === "inks" && (
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
                {selectedOption === "wearables" && (
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
                {selectedOption === "paper" && (
                  <>
                    <option value="stamp">Stamp</option>
                    <option value="a4">A4</option>
                    <option value="role">Role</option>
                  </>
                )}
                {selectedOption === "others" && (
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
            <label>Date:</label>
            <input
              className="sell-date"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          <div>
            <label>Amount to Subtract:</label>
            <input
              className="sell-amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <button className="sell-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Sell;
