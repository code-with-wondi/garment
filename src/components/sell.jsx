import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

const Sell = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSubOption, setSelectedSubOption] = useState('');
  const [amount, setAmount] = useState('');

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

  const handleSave = async () => {
    if (selectedOption && selectedSubOption && amount) {
      // Check if a document with the same option and sub-option exists
      const querySnapshot = await getDocs(
        query(collection(db, "items"), 
          where("option", "==", selectedOption),
          where("subOption", "==", selectedSubOption)
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

          console.log('Data updated in Firebase.');
        } else {
          alert('Subtracting this amount would result in a negative value. Please enter a valid amount.');
        }
      } else {
        alert('No matching document found. Please select a valid option and sub-option.');
      }
    } else {
      alert('Please select an option, sub-option, and enter an amount.');
    }
  };

  return (
    <div>
      <h2>Sell Form</h2>
      <div>
        <label>Select Option:</label>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">Select an option</option>
          <option value="mg">MG</option>
          <option value="ls">LS</option>
          {/* Add more options as needed */}
        </select>
      </div>
      {selectedOption && (
        <div>
          <label>Select Sub-Option:</label>
          <select value={selectedSubOption} onChange={handleSubOptionChange}>
            <option value="">Select a sub-option</option>
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
        <label>Amount to Subtract:</label>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Sell;
