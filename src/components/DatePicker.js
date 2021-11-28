/* eslint-disable react-hooks/exhaustive-deps */
import { addDays } from "date-fns";
import React from "react";
import hexToRgb from "../global/helpers/hexToRgb";
import styles from "./DatePicker.module.css"
import { DateView } from "./DateView";
import { MonthView } from './MonthView';

const DatePicker = (props) => {
    const next = (event) => {
        event.preventDefault();
        const e = document.getElementById('container');
        const width = e ? e.getBoundingClientRect().width : null;
        e.scrollLeft += width - 60;
    };

    const prev = (event) => {
        event.preventDefault();
        const e = document.getElementById('container');
        const width = e ? e.getBoundingClientRect().width : null;
        e.scrollLeft -= width - 60;
    };

    const primaryColor = props.color? (props.color.indexOf("rgb") > 0?props.color:hexToRgb(props.color)):'rgb(54, 105, 238)';

    const startDate = props.startDate || new Date();
    const lastDate = addDays(startDate, props.days || 90);

    let buttonzIndex = {zIndex: 2};
    let buttonStyle = {background: primaryColor};
    let Component = DateView;

    if (props.type === "month") {
        buttonzIndex = {zIndex: 5};
        Component = MonthView;
        buttonStyle = {background: primaryColor, marginBottom: "5px"};
    }

    return (
        <div className={styles.container}>
            <div className={styles.buttonWrapper} style={buttonzIndex}>
                <button className={styles.button} style={buttonStyle} onClick={prev}>&lt;</button>
            </div>
            <Component {...props} primaryColor={primaryColor} startDate={startDate} lastDate={lastDate}/>
            <div className={styles.buttonWrapper} style={buttonzIndex}>
                <button className={styles.button} style={buttonStyle} onClick={next}>&gt;</button>
            </div>
        </div>
    )
}

export { DatePicker }