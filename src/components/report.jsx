import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Report = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Create a Firestore query to filter data for the selected date
        const q = query(
          collection(db, 'items'),
          where('date', '==', selectedDate)
        );

        const querySnapshot = await getDocs(q);
        const newData = querySnapshot.docs.map((doc) => doc.data());
        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedDate]);

  // Function to format a date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <h2>Report Page</h2>
      <div>
        <label>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <p>Data for: {formatDate(selectedDate)}</p>
      {data.length === 0 ? (
        <p>No data available</p>
      ) : (
        data.map((item, index) => (
          <div key={index} className="report-card">
            <p>Option: {item.option}</p>
            <p>Sub-Option: {item.subOption}</p>
            <p>Amount: {item.amount}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Report;
