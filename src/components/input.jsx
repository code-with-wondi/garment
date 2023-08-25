import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';

const Input = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSubOption, setSelectedSubOption] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()); // Added selectedDate state

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
    setSelectedDate(new Date(event.target.value));
  };

  const itemsCollectionRef = collection(db, "items");

  const handleSave = async () => {
    // Check if all fields are selected
    if (selectedOption && selectedSubOption && amount && selectedDate) {
      // Query Firestore to check if a document with the same option, sub-option, and date exists
      const querySnapshot = await getDocs(query(collection(db, "items"), 
        where("option", "==", selectedOption),
        where("subOption", "==", selectedSubOption),
        where("date", "==", selectedDate.toISOString().split('T')[0]) // Convert selectedDate to ISO string and extract date part
      ));
  
      if (!querySnapshot.empty) {
        // If a document with the same option, sub-option, and date exists, update it
        const docRef = querySnapshot.docs[0].ref;
        const existingAmount = querySnapshot.docs[0].data().amount;
        const updatedAmount = existingAmount + parseInt(amount);
  
        await updateDoc(docRef, {
          amount: updatedAmount,
        });
      } else {
        // If no such document exists, create a new one
        await addDoc(itemsCollectionRef, {
          option: selectedOption,
          subOption: selectedSubOption,
          amount: parseInt(amount),
          date: selectedDate.toISOString().split('T')[0], // Save date in ISO string format (only date part)
        });
      }
  
      // Reset the form fields
      setSelectedOption('');
      setSelectedSubOption('');
      setAmount('');
      setSelectedDate(new Date());
  
      console.log('Data saved to Firebase.');
    } else {
      alert('Please select an option, sub-option, date, and enter an amount.');
    }
  };

  return (
    <div>
      <h2>Input Form</h2>
      <div>
        <label>Select Option:</label>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">Select an option</option>
          <option value="mg">MG</option>
          <option value="ls">LS</option>
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
              </>
            )}
            {selectedOption === 'ls' && (
              <>
                <option value="ki">KI</option>
                <option value="kip">KIP</option>
                <option value="lsi">LSI</option>
              </>
            )}
          </select>
        </div>
      )}
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <div>
        <label>Select Date:</label>
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]} // Display date in ISO format (only date part)
          onChange={handleDateChange}
        />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Input;
