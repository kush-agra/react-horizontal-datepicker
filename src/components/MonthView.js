/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import styles from "./DatePicker.module.css"
import {
    addMonths,
    differenceInMonths,
    format,
    isSameDay,
    startOfMonth
} from "date-fns";


const MonthView = ({startDate, lastDate, selectDate, getSelectedDay, primaryColor, labelFormat}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const rgb = primaryColor.replace(/[^\d,]/g, '').split(',');
    const brightness = Math.round(((parseInt(rgb[0]) * 299) +
                      (parseInt(rgb[1]) * 587) +
                      (parseInt(rgb[2]) * 114)) / 1000);
    const textColour = (brightness > 125) ? 'black' : 'white';

    const selectedStyle = {borderRadius:"0.7rem",background:`${primaryColor}`, color: textColour};
    
    const getStyles = (day) => {
        return isSameDay(day, selectedDate)?selectedStyle:null;
    };
    
    const getId = (day) => {
        return isSameDay(day, selectedDate)?'selected':"";
    };

    const renderDays = () => {

        const months = [];
        
        for (let i = 0; i <= differenceInMonths(lastDate, startDate); i++) {
            const month = startOfMonth(addMonths(startDate, i));
            months.push(
                <div id={`${getId(month)}`}
                     className={styles.monthContainer} 
                     key={month}
                     style={getStyles(month)}
                     onClick={() => onDateClick(month)}
                >
                    <span className={styles.monthYearLabel}>
                        {format(month, labelFormat || "MMMM yyyy")}
                    </span>
                </div>
            );
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




export { MonthView }