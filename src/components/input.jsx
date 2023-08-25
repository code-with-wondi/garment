import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import './Input.css'; // Import a CSS file for styling
import Header from './Heaer';

const Input = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSubOption, setSelectedSubOption] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

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
    if (selectedOption && selectedSubOption && amount && selectedDate) {
      const querySnapshot = await getDocs(query(collection(db, "items"), 
        where("option", "==", selectedOption),
        where("subOption", "==", selectedSubOption),
        where("date", "==", selectedDate.toISOString().split('T')[0])
      ));

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const existingAmount = querySnapshot.docs[0].data().amount;
        const updatedAmount = existingAmount + parseInt(amount);

        await updateDoc(docRef, {
          amount: updatedAmount,
        });
      } else {
        await addDoc(itemsCollectionRef, {
          option: selectedOption,
          subOption: selectedSubOption,
          amount: parseInt(amount),
          date: selectedDate.toISOString().split('T')[0],
        });
      }

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
    <>
    <Header />
    <div className="wrapper">
    <div className="input-container">
      <h2 className="input-title">Input Form</h2>
      <div>
        <label>Select Type:</label>
        <select className="input-select" value={selectedOption} onChange={handleOptionChange}>
          <option value="">Select an type</option>
          <option value="mg">MG</option>
          <option value="ls">LS</option>
        </select>
      </div>
      {selectedOption && (
        <div>
          <label>Select Category:</label>
          <select className="input-select" value={selectedSubOption} onChange={handleSubOptionChange}>
            <option value="">Select a category</option>
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
      <div className='diver'>
        <label>Amount:</label>
        <input
          className="input-amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <div>
        <label>Select Date:</label>
        <input
          className="input-date"
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={handleDateChange}
        />
      </div>
      <button className="input-button" onClick={handleSave}>Save</button>
    </div>
    </div>
    </>
  );
}

export default Input;
