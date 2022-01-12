/* eslint-disable react-hooks/exhaustive-deps */
import { addDays } from "date-fns";
import React, {useRef, useState, useEffect} from "react";
import hexToRgb from "../global/helpers/hexToRgb";
import styles from "./DatePicker.module.css"
import { DateView } from "./DateView";
import { MonthView } from './MonthView';

const DatePicker = (props) => {
    const [prevButtonStyle, setPrevButtonStyle] = useState(null);
    const [nextButtonStyle, setNextButtonStyle] = useState(null);

    const next = (event) => {
        event.preventDefault();
        const e = document.getElementById('container');
        const width = e ? e.getBoundingClientRect().width : null;
        e.scroll({
            left: e.scrollLeft + width - 60,
            top: 0,
            behavior: 'smooth'
        })
        checkButton()
    };

    const prev = (event) => {
        event.preventDefault();
        const e = document.getElementById('container');
        const width = e ? e.getBoundingClientRect().width : null;
        e.scroll({
            left: e.scrollLeft - width - 60,
            top: 0,
            behavior: 'smooth'
        })
        checkButton()
    };

    const onScroll = (e) => {
        checkButton()
    }
    const checkButton = () => {
        const e = document.getElementById('container');
        const width = e ? e.getBoundingClientRect().width : null;

        const isNextDisabled = e ? e.scrollWidth - width === e.scrollLeft : true;
        const isPrevDisabled = e ? e.scrollLeft === 0 : true;

        setPrevButtonStyle(isPrevDisabled ? disabledButtonStyle : buttonStyle);
        setNextButtonStyle(isNextDisabled ? disabledButtonStyle : buttonStyle);
    }
    useEffect(() => {
        checkButton()
    }, []);

    const primaryColor = props.color? (props.color.indexOf("rgb") > 0?props.color:hexToRgb(props.color)):'rgb(54, 105, 238)';

    const startDate = props.startDate || new Date();
    const lastDate = addDays(startDate, props.days || 90);

    let buttonzIndex = {zIndex: 2};
    let buttonStyle = {background: primaryColor};
    let disabledButtonStyle = {background: "#818387"};

    let Component = DateView;

    if (props.type === "month") {
        buttonzIndex = {zIndex: 5};
        Component = MonthView;
        buttonStyle = {background: primaryColor, marginBottom: "5px"};
    }

    return (
        <div className={styles.container} onScroll={onScroll}>
            <div className={styles.buttonWrapper} style={buttonzIndex}>
                <button className={styles.button} style={prevButtonStyle} onClick={prev}>&lt;</button>
            </div>
            <Component {...props} primaryColor={primaryColor} startDate={startDate} lastDate={lastDate}/>
            <div className={styles.buttonWrapper} style={buttonzIndex}>
                <button className={styles.button} style={nextButtonStyle} onClick={next}>&gt;</button>
            </div>
        </div>
    )
}

export { DatePicker }