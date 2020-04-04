import React from 'react';
import './App.css';
import DatePicker from "./components/DatePicker";

function App() {
    const selectedDay = (val) =>{
        console.log(val)
    };

  return (
    <div className="App">
        <DatePicker getSelectedDay={selectedDay}/>
    </div>
  );
}

export default App;
