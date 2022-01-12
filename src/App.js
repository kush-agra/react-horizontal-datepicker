import React from 'react';
import './App.css';
import { DatePicker } from "./components/DatePicker";

function App() {
  const getSelectedDay = (val) =>{
      console.log(val)
  };

  const startDate = new Date(2010, 0, 1);

  return (
    <div className="App">
        <DatePicker
          getSelectedDay={getSelectedDay}
          endDate={12}
          color={'#368007'}
        />
    </div>
  );
}

export default App;
