/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import "./datepicker.css"
import {
    addDays,
    addMonths,
    differenceInDays,
    differenceInMonths,
    format,
    isBefore,
    isSameDay,
    lastDayOfMonth
} from "date-fns";

export default function DatePicker(props) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const {endDate, selectDate} = props;
    let maxValue = endDate || 90;

    const getStyles = (day) => {
        console.log(day);
        const classes = [];
        if (isSameDay(day, selectedDate)) {
            classes.push('DateDayItem--selected');
        }
        if (!isSameDay(day, new Date()) && isBefore(day, new Date())) {
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

    function renderDays() {
        const dayFormat = "E";
        const dateFormat = "d";
        const months = [];
        let days = [];
        let startDate = new Date();
        let lastDate = addDays(new Date(), maxValue);
        console.log(lastDayOfMonth(new Date(2020, 3, 1, 0, 1)));
        console.log(Number(format(differenceInDays(lastDayOfMonth(new Date(2020, 3, 1, 0, 1)), new Date()), dateFormat)));

        for (let i = 0; i <= differenceInMonths(lastDate, startDate); i++) {
            let start, end;
            let month = addMonths(new Date(), i);
            start = i === 0 ? Number(format(startDate, dateFormat)) - 1 : 0;
            console.dir({startDate, start, ss: "s"});
            end = i === differenceInMonths(lastDate, startDate) ? Number(format(lastDate, "d")) : Number(format(lastDayOfMonth(month), "d"));
            for (let j = start; j < end; j++) {
                console.log(month, j);
                days.push(
                    <div id={`${getId(addDays(startDate, j))}`}
                         className={`Datepicker--DateDayItem ${getStyles(addDays(month, j))}`}
                         key={addDays(month, j)}
                         onClick={() => onDateClick(addDays(month, j))}
                    >
                        <div className={"Datepicker--DayLabel"}>
                            {format(addDays(month, j), dayFormat)}
                        </div>
                        <div className={"Datepicker--DateLabel"}>
                            {j + 1}
                        </div>
                    </div>
                );
            }
            months.push(<div className={"monthContainer"}>{days}</div>);
            days = [];
        }


        // for (let i = 0; i < Number(format(lastDayOfMonth(addDays(startDate, 10)), dateFormat)); i++) {
        //     days.push(
        //         <>
        //             <div id={`${getId(addDays(startDate, i))}`}
        //                  className={`Datepicker--DateDayItem ${getStyles(addDays(startDate, i))}`}
        //                  key={i * i + 2}
        //                  onClick={() => onDateClick(addDays(startDate, i))}
        //             >
        //                 <div className={"Datepicker--DayLabel"} key={i}>
        //                     {format(addDays(startDate, i), dayFormat)}
        //                 </div>
        //                 <div className={"Datepicker--DateLabel"} key={i * i + 1}>
        //                     {format(addDays(startDate, i), dateFormat)}
        //                 </div>
        //             </div>
        //         </>
        //     );
        // }
        console.log(months);
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


    let e = document.getElementById('container');
    let width = e ? e.getBoundingClientRect().width : null;

    const nextWeek = () => document.getElementById('container').scrollLeft += width;

    const prevWeek = () => document.getElementById('container').scrollLeft -= width;

    // const dateFormat = "MMMM yyyy";
    return (
        <div className={"Datepicker--Container"}>
            <div className={"Datepicker--Strip"}>
                <div className={"Datepicker"}>
                    <button className={"Datepicker--button-prev"} onClick={prevWeek}>←</button>
                    {renderDays()}
                    <button className={"Datepicker--button-next"} onClick={nextWeek}>→</button>
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