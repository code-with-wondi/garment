import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import './Sell.css'; // Import the CSS file
import Header from './Heaer';

const Sell = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSubOption, setSelectedSubOption] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // Initialize the form with the current option and sub-option values if needed
    // You can fetch this data from Firestore if you have a specific use case
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setSelectedSubOption('');
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
      // Check if a document with the same option, sub-option, and date exists
      const querySnapshot = await getDocs(
        query(collection(db, "items"), 
          where("option", "==", selectedOption),
          where("subOption", "==", selectedSubOption),
          where("date", "==", selectedDate) // Assuming you have a 'date' field in your documents
        )
      );

      if (!querySnapshot.empty) {
        // If a matching document is found, subtract from the existing amount
        const docRef = querySnapshot.docs[0].ref;
        const existingAmount = querySnapshot.docs[0].data().amount;
        const updatedAmount = existingAmount - parseInt(amount);

        if (updatedAmount >= 0) {
          // Ensure the result is not negative
          await updateDoc(docRef, {
            amount: updatedAmount,
          });

          // Reset the form fields
          setSelectedOption('');
          setSelectedSubOption('');
          setAmount('');
          setSelectedDate('');

          console.log('Data updated in Firebase.');
        } else {
          alert('Subtracting this amount would result in a negative value. Please enter a valid amount.');
        }
      } else {
        alert('No matching document found. Please select a valid option, sub-option, and date.');
      }
    } else {
      alert('Please select an option, sub-option, date, and enter an amount.');
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
        <select className="sell-select" value={selectedOption} onChange={handleOptionChange}>
          <option value="">Select an type</option>
          <option value="mg">MG</option>
          <option value="ls">LS</option>
          {/* Add more options as needed */}
        </select>
      </div>
      {selectedOption && (
        <div>
          <label>Select Category:</label>
          <select className="sell-select" value={selectedSubOption} onChange={handleSubOptionChange}>
            <option value="">Select a category</option>
            {selectedOption === 'mg' && (
              <>
                <option value="pollo">Pollo</option>
                <option value="adidas">Adidas</option>
                <option value="puma">Puma</option>
                {/* Add more sub-options as needed */}
              </>
            )}
            {selectedOption === 'ls' && (
              <>
                <option value="ki">KI</option>
                <option value="kip">KIP</option>
                <option value="lsi">LSI</option>
                {/* Add more sub-options as needed */}
              </>
            )}
            {/* Add more option-specific sub-options here */}
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
      <button className="sell-button" onClick={handleSave}>Save</button>
    </div>
    </div>
    </>
  );
}

export default Sell;
