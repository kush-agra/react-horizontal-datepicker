/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import "./datepicker.css"
import styles from "./DatePicker.module.css"
import {
    addDays,
    addMonths,
    differenceInMonths,
    format,
    isBefore,
    isSameDay,
    lastDayOfMonth,
    startOfMonth
} from "date-fns";

export default function DatePicker(props) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const {endDate, selectDate} = props;
    const firstSection = {marginLeft: '40px'};
    const startDate = new Date();
    const lastDate = addDays(new Date(), endDate || 90);
    const primaryColor = 'rgb(54, 105, 238)';
    const selectedStyle = {fontWeight:"bold",width:"45px",height:"45px",borderRadius:"50%",border:`2px solid ${primaryColor}`,color:primaryColor};
    const buttonColor = {background: primaryColor};

    const getStyles = (day) => {
        if (isSameDay(day, selectedDate)) {
            return(selectedStyle);
        }
        // if (!isSameDay(day, new Date()) && isBefore(day, new Date())) {
        //     return('DateDayItem--disabled')
        // }
        return null
    };

    const getId = (day) => {
        if (isSameDay(day, selectedDate)) {
            return ('selected')
        } else {
            return ("")
        }
    };

    function renderDays() {
        const dayFormat = "E";
        const dateFormat = "d";
        const months = [];
        let days = [];
        for (let i = 0; i <= differenceInMonths(lastDate, startDate); i++) {
            let start, end;
            const month = startOfMonth(addMonths(new Date(), i));
            start = i === 0 ? Number(format(startDate, dateFormat)) - 1 : 0;
            end = i === differenceInMonths(lastDate, startDate) ? Number(format(lastDate, "d")) : Number(format(lastDayOfMonth(month), "d"));
            for (let j = start; j < end; j++) {
                days.push(
                    <div id={`${getId(addDays(startDate, j))}`}
                         className={`Datepicker--DateDayItem`}
                         style={getStyles(addDays(month, j))}
                         key={addDays(month, j)}
                         onClick={() => onDateClick(addDays(month, j))}
                    >
                        <div className={"Datepicker--DayLabel"}>
                            {format(addDays(month, j), dayFormat)}
                        </div>
                        <div className={"Datepicker--DateLabel"}>
                            {format(addDays(month, j), dateFormat)}
                            {/*{j + 1}*/}
                        </div>
                    </div>
                );
            }
            months.push(
                <div className={"monthContainer"} key={month}>
                    <span className={"Datepicker--MonthYearLabel"}>
                        {format(month, "MMMM yyyy")}
                    </span>
                    <div className={"daysContainer"} style={i===0?firstSection:null}>
                        {days}
                    </div>
                </div>
            );
            days = [];
        }
        return <div id={"container"} className={"Datepicker--DateList--scrollable"}>{months}</div>;
    }

    const onDateClick = day => {
        setSelectedDate(day);
        if (props.getSelectedDay) {
            props.getSelectedDay(day);
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
                setSelectedDate(selectDate);
                setTimeout(() => {
                    let view = document.getElementById('selected');
                    if (view) {
                        view.scrollIntoView({behavior: "smooth", inline: "center", block: "nearest"});
                    }
                }, 20);
            }
        }
    }, [selectDate]);

    const nextWeek = () => {
        const e = document.getElementById('container');
        const width = e ? e.getBoundingClientRect().width : null;
        e.scrollLeft += width;
    };

    const prevWeek = () => {
        const e = document.getElementById('container');
        const width = e ? e.getBoundingClientRect().width : null;
        e.scrollLeft -= width;
    };

    // const dateFormat = "MMMM yyyy";
    return (
        <div className={"Datepicker--Container"}>
            <div className={"Datepicker--Strip"}>
                <div className={"Datepicker"}>
                    <div className={"Datepicker--buttonWrapper"}>
                        <button className={styles.button} style={buttonColor} onClick={prevWeek}>←</button>
                    </div>
                    {renderDays()}
                    <div className={"Datepicker--buttonWrapper"}>
                        <button className={styles.button} style={buttonColor} onClick={nextWeek}>→</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

/*main loop by calculation number of months till we have to go
* secondary loop for every month and check and first time start from current date 1st of month
* add a sticky month
* more pictures
* example code sandbox
* update readme
* v2 hype
* styles module*/