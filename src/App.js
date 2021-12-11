import React from 'react';
import './App.css';
import { DatePicker } from "./components/DatePicker";

function App() {
  const selectedDay = (val) =>{
      console.log(val)
  };

  const startDate = new Date(2010, 0, 1);

  return (
    <div className="App">
        <DatePicker startDate={startDate} 
                    days={366 * 25}
                    type="day"
                    selectDate={new Date(2021, 9, 5)}
                    getSelectedDay={selectedDay} 
                    labelFormat={"MMMM yyyy"} 
                    color={"#374e8c"}
                    marked={[
                        {
                            date: new Date(2021, 9, 3),
                            marked: true,
                            style: {
                                color: "#ff0000",
                                padding: "2px",
                                fontSize: 12,
                            },
                            text: "1x",
                        },
                        {
                            date: new Date(2021, 9, 4),
                            marked: true,
                            text: "5x"
                        },
                    ]}
        />
    </div>
  );
}

export default App;
