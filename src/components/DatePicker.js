/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import { Waypoint } from 'react-waypoint';
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
    getDate,
    parse

} from "date-fns";

export default function DatePicker() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [currentDate] = useState(new Date());
    const scroll = true;
    let maxValue;
    if (scroll===false){
        maxValue = 7;
    }
    else{
        maxValue = 90;
    }
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
    const getScroll = () => {
        if(scroll === true){
            return('Datepicker--DateList--scrollable');
        }
        else{
            maxValue = 7;
            return('Datepicker--DateList');
        }
    };

    function renderDays() {
        const dayFormat = "E";
        const dateFormat = "dd";
        const days = [];
        let startDay = subDays(currentWeek,3);
        for (let i = 0; i < maxValue; i++) {
            days.push(
                <div className={`Datepicker--DateDayItem ${getStyles(addDays(startDay, i))}`}
                     key={i*i+2}
                     onClick={() => onDateClick(addDays(startDay, i))}
                >
                    {getDate(addDays(startDay,i)) === 1? <Waypoint horizontal={true} onEnter={()=>(console.log('y'))}/> : null}
                    <div className={"Datepicker--DayLabel"} key={i}>
                        {format(addDays(startDay, i), dayFormat)}
                    </div>
                    <div className={"Datepicker--DateLabel"} key={i*i+1}>
                        {format(addDays(startDay, i), dateFormat)}
                    </div>
                </div>
            );
        }
        return <div id={"container"} className={`${getScroll()}`}>{days}</div>;
    }

    const onDateClick = day => {
        if(!isBefore(day,currentDate)){
            setSelectedDate(day);
        }
    };
    const nextWeek = () => {scroll ? document.getElementById('container').scrollLeft += 700 : setCurrentWeek(addWeeks(currentWeek,1))};

    const prevWeek = () => {scroll ? document.getElementById('container').scrollLeft -= 700 : setCurrentWeek(subWeeks(currentWeek,1))};

    // noinspection SpellCheckingInspection
    const dateFormat = "MMMM";
    return(
        <div>
     <div className={"Datepicker--Strip"}>
         <span>{format(currentWeek, dateFormat)}</span>
         <div className={"Datepicker"}>
             <button onClick={prevWeek}>Previous</button>
            {renderDays()}
            <button onClick={nextWeek}>Next</button>
         </div>
     </div>
        </div>
    )
}







//todo: lastSelectedDate ahead disabled, endDate ahead not shown
//todo: npm run publish:npm and npm publish