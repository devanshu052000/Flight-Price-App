import React, { useState } from "react";
import './App.css';

function App() {

  const [flight, setFlight] = useState([]);
  const [details, setDetails] = useState({
    source: "",
    destination: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details)
    })
      .then((res) => res.json())
      .then((data) => setFlight(data.flights));
  }
    
  return (
    <div className="App">
      <form onSubmit={handleSubmit} action="/" method="POST">
        <input name="source" type='text' onChange={handleChange} value={details.source} placeholder="Enter the source of journey" />
        <input name="destination" type='text' onChange={handleChange} value={details.destination} placeholder="Enter the destination of journey" />
        <input name="date" type='text' onChange={handleChange} value={details.date} placeholder="Enter date of departure (dd-mm-yyyy)" />

        <button type="submit">Search Flights</button>
      </form>
      {flight.map((item, i) => (<p key={i}>{item.fname} - {item.fprice}</p>))}
    </div>
  );
}

export default App;