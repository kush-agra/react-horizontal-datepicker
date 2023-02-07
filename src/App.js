import React from "react";
import "./App.css";
import { DatePicker } from "./components/DatePicker";
import lang from "./components/Lang";

function App() {
  const selectedDay = (val) => {
    console.log(val);
  };

  const startDate = new Date();

  return (
    <div className="App">
      <DatePicker
        startDate={startDate}
        days={366 * 25}
        type="day"
        selectDate={new Date()}
        getSelectedDay={selectedDay}
        labelFormat={"LLLL"}
        color={"#374e8c"}
        lang={lang.fr}
      />
    </div>
  );
}

export default App;
