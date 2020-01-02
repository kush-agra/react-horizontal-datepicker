import React, {useState} from "react";
import "./datepicker.css"
import {
    format,
    addMonths,
    addWeeks,
    subWeeks,
    subMonths,
    startOfWeek,
    addDays,
    startOfMonth,
    getDay,
    subDays,
    isSameDay,
    isBefore,
    parse

} from "date-fns";

export default function DatePicker() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [currentDate] = useState(new Date());
    const getStyles = (day) => {
        const classes = [];

        if (isSameDay(day,selectedDate)) {
            classes.push('DateDayItem--selected')
        }
        if(isBefore(day,currentDate)) {
            classes.push('DateDayItem--disabled')
        }


        return classes.join(' ')
    };

    function renderDays() {
        const dayFormat = "E";
        const dateFormat = "dd";
        const days = [];
        let startDay = subDays(currentWeek,3);
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className={`Datepicker--DateDayItem ${getStyles(addDays(startDay, i))}`}
                     key={i*i+2}
                     onClick={() => onDateClick(addDays(startDay, i))}
                >
                    <div className={"Datepicker--DayLabel"} key={i}>
                        {format(addDays(startDay, i), dayFormat)}
                    </div>
                    <div className={"Datepicker--DateLabel"} key={i*i+1}>
                        {format(addDays(startDay, i), dateFormat)}
                    </div>
                </div>
            );
        }

        // let startDay = getDay(currentWeek);
        return <div className={"Datepicker--DateList"}>{days}</div>;
    }

    function renderCells() {}

    const onDateClick = day => {setSelectedDate(day);console.log(day)};

    const nextWeek = () => {setCurrentWeek(addWeeks(currentWeek,1))};

    const prevWeek = () => {setCurrentWeek(subWeeks(currentWeek,1))};

    const dateFormat = "MMMM yyyy";
    return(
     <div className={"Datepicker--Strip"}>
         {format(currentWeek, dateFormat)}
         <div style={{display: 'flex', marginTop: '10px'}}>
         <button onClick={prevWeek}>Previous</button>
         {renderDays()}
         <button onClick={nextWeek}>Next</button>
         </div>
         {renderCells()}
     </div>
    )
}







//todo: lastSelectedDate ahead disabled, endDate ahead not shown
//todo: npm run publish:npm and npm publish