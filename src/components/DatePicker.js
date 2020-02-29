/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import {Waypoint} from 'react-waypoint';
import "./datepicker.css"
import {
    addDays,
    addWeeks,
    differenceInDays,
    format,
    getDate,
    isBefore,
    isSameDay,
    lastDayOfMonth,
    subDays,
    subWeeks
} from "date-fns";

export default function DatePicker(props) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [softSelect, setSoftSelect] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [currentDate] = useState(new Date());
    const {endDate, shouldScroll} = props;
    let {selectDate} = props;
    let scroll = false;
    shouldScroll === true? scroll = true : scroll = false;
    let maxValue;

    if (scroll===false){
        maxValue = 7;
    }
    else{
        maxValue = endDate | 90;
    }

    const getStyles = (day) => {
        const classes = [];
        if (isSameDay(day, selectedDate)) {
            classes.push('DateDayItem--selected')
        }
        if (isBefore(day, currentDate)) {
            classes.push('DateDayItem--disabled')
        }
        return classes.join(' ')
    };

    const getId = (day) => {
        if (isSameDay(day, selectedDate)) {
            return ('selected')
        } else {
            return ("")
        }
    };

    const getScroll = () => {
        if (scroll === true) {
            return ('Datepicker--DateList--scrollable');
        } else {
            maxValue = 7;
            return ('Datepicker--DateList');
        }
    };

    function renderDays() {
        const dayFormat = "E";
        const dateFormat = "d";
        const days = [];
        let startDay = subDays(currentWeek, 3);
        console.log(lastDayOfMonth(new Date(2020, 3, 1, 0, 1)));
        console.log(Number(format(differenceInDays(lastDayOfMonth(new Date(2020, 3, 1, 0, 1)), new Date()), dateFormat)));


        for (let i = 0; i < Number(format(lastDayOfMonth(addDays(startDay, 10)), dateFormat)); i++) {
            days.push(
                <>
                    {getDate(addDays(startDay, i)) === 1 ?
                        <div>s</div> : null}
                    <div id={`${getId(addDays(startDay, i))}`}
                         className={`Datepicker--DateDayItem ${getStyles(addDays(startDay, i))}`}
                         key={i * i + 2}
                         onClick={() => onDateClick(addDays(startDay, i))}
                    >
                        {getDate(addDays(startDay, i)) === 20 ?
                            <Waypoint horizontal={true} onEnter={() => (setSoftSelect(addDays(startDay, i)))}/> : null}
                        {isSameDay(addDays(startDay, i), currentDate) ?
                            <Waypoint horizontal={true} onEnter={() => (setSoftSelect(addDays(startDay, i)))}/> : null}
                        <div className={"Datepicker--DayLabel"} key={i}>
                            {format(addDays(startDay, i), dayFormat)}
                        </div>
                        <div className={"Datepicker--DateLabel"} key={i * i + 1}>
                            {format(addDays(startDay, i), dateFormat)}
                        </div>
                    </div>
                </>
            );
        }
        return <div id={"container"} className={`${getScroll()}`}>{days}</div>;
    }

    const onDateClick = day => {
        if (!isBefore(day, currentDate)) {
            selectDate = null;
            setSelectedDate(day);
            if (props.getSelectedDay) {
                props.getSelectedDay(day);
            }
        }
    };

    useEffect(() => {
        if (props.getSelectedDay) {
            if (selectDate) {
                props.getSelectedDay(selectDate);
            } else {
                props.getSelectedDay(new Date());
            }
        }
    }, []);

    useEffect(() => {
        if (selectDate) {
            if (!isSameDay(selectedDate, selectDate)) {
                setSelectedDate(selectDate)
                    .then(() => {
                        console.log("ess")
                    });
                setTimeout(() => {
                    let view = document.getElementById('selected');
                    if (view) {
                        view.scrollIntoView({behavior: "smooth", inline: "center", block: "nearest"});
                    }
                }, 20);
            }
        }
    }, [selectDate]);


    let e = document.getElementById('container');
    let width = e ? e.getBoundingClientRect().width : null;

    const nextWeek = () => {
        scroll ? document.getElementById('container').scrollLeft += width : setCurrentWeek(addWeeks(currentWeek, 1))
    };

    const prevWeek = () => {
        scroll ? document.getElementById('container').scrollLeft -= width : setCurrentWeek(subWeeks(currentWeek, 1))
    };

    // noinspection SpellCheckingInspection
    const dateFormat = "MMMM yyyy";
    return (
        <div className={"Datepicker--Container"}>
            <div className={"Datepicker--Strip"}>
             <span className={"Datepicker--MonthYearLabel"}>
                 {scroll ? format(softSelect, dateFormat) : format(currentWeek, dateFormat)}
             </span>
                <div className={"Datepicker"}>
                    <button className={"Datepicker--button-prev"} onClick={prevWeek}>←</button>
                    {renderDays()}
                    <button className={"Datepicker--button-next"} onClick={nextWeek}>→</button>
                </div>
            </div>
        </div>
    )
}