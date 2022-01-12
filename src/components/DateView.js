/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import styles from "./DatePicker.module.css"
import {
    addDays,
    addMonths,
    differenceInMonths,
    format,
    isSameDay,
    isYesterday,
    isToday,
    isTomorrow,
    lastDayOfMonth,
    startOfMonth
} from "date-fns";


const DateView = ({startDate, lastDate, selectDate, getSelectedDay}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const firstSection = {marginLeft: '40px'};

    const getId = (day) => {
        return isSameDay(day, selectedDate)?'selected':"";
    };

    const renderDays = () => {
        const dateFormat = "d";

        const months = [];
        let days = [];

        // const styleItemMarked = marked ? styles.dateDayItemMarked : styles.dateDayItem;

        for (let i = 0; i <= differenceInMonths(lastDate, startDate); i++) {
            let start, end;
            const month = startOfMonth(addMonths(startDate, i));

            start = i === 0 ? Number(format(startDate, dateFormat)) - 1 : 0;
            end = i === differenceInMonths(lastDate, startDate) ? Number(format(lastDate, "d")) : Number(format(lastDayOfMonth(month), "d"));

            for (let j = start; j < end; j++) {
                let currentDay = addDays(month, j);
                let dayLabel = '\u00A0';
                if(isYesterday(currentDay)) dayLabel = "Yesterday";
                if(isToday(currentDay)) dayLabel = "Today";
                if(isTomorrow(currentDay)) dayLabel = "Tomorrow";
                days.push(
                    <div id={`${getId(currentDay)}`}
                         className={isSameDay(currentDay, selectedDate) ? styles.dateDayItemSelected : styles.dateDayItem}
                         key={currentDay}
                         onClick={() => onDateClick(currentDay)}
                    >
                        <div className={styles.dayLabel}>{dayLabel}</div>
                        <div className={styles.weekdayLabel}>{format(currentDay, "EEEE")}</div>
                        <div className={styles.dateLabel}>{format(currentDay, "MMM. do")}</div>
                    </div>
                );
            }
            months.push(
                <div className={styles.monthContainer}
                     key={month}
                >
                    <div className={styles.daysContainer} style={i===0?firstSection:null}>
                        {days}
                    </div>
                </div>
            );
            days = [];

        }

        return <div id={"container"} className={styles.dateListScrollable}>{months}</div>;
    }

    const onDateClick = day => {
        setSelectedDate(day);
        if (getSelectedDay) {
            getSelectedDay(day);
        }
    };

    useEffect(() => {
        if (getSelectedDay) {
            if (selectDate) {
                getSelectedDay(selectDate);
            } else {
                getSelectedDay(startDate);
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

    return <React.Fragment>{renderDays()}</React.Fragment>
}




export { DateView }