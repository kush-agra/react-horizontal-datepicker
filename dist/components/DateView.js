/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./DatePicker.module.css";
import { addDays, addMonths, differenceInMonths, format, isSameDay, lastDayOfMonth, startOfMonth } from "date-fns";

const DateView = ({
  startDate,
  lastDate,
  selectDate,
  getSelectedDay,
  primaryColor,
  labelFormat
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const firstSection = {
    marginLeft: '40px'
  };
  const selectedStyle = {
    fontWeight: "bold",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    border: `2px solid ${primaryColor}`,
    color: primaryColor
  };
  const labelColor = {
    color: primaryColor
  };

  const getStyles = day => {
    return isSameDay(day, selectedDate) ? selectedStyle : null;
  };

  const getId = day => {
    return isSameDay(day, selectedDate) ? 'selected' : "";
  };

  const renderDays = () => {
    const dayFormat = "E";
    const dateFormat = "d";
    const months = [];
    let days = [];

    for (let i = 0; i <= differenceInMonths(lastDate, startDate); i++) {
      let start, end;
      const month = startOfMonth(addMonths(startDate, i));
      start = i === 0 ? Number(format(startDate, dateFormat)) - 1 : 0;
      end = i === differenceInMonths(lastDate, startDate) ? Number(format(lastDate, "d")) : Number(format(lastDayOfMonth(month), "d"));

      for (let j = start; j < end; j++) {
        let currentDay = addDays(month, j);
        days.push( /*#__PURE__*/React.createElement("div", {
          id: `${getId(currentDay)}`,
          className: styles.dateDayItem,
          style: getStyles(currentDay),
          key: currentDay,
          onClick: () => onDateClick(currentDay)
        }, /*#__PURE__*/React.createElement("div", {
          className: styles.dayLabel
        }, format(currentDay, dayFormat)), /*#__PURE__*/React.createElement("div", {
          className: styles.dateLabel
        }, format(currentDay, dateFormat))));
      }

      months.push( /*#__PURE__*/React.createElement("div", {
        className: styles.monthContainer,
        key: month
      }, /*#__PURE__*/React.createElement("span", {
        className: styles.monthYearLabel,
        style: labelColor
      }, format(month, labelFormat || "MMMM yyyy")), /*#__PURE__*/React.createElement("div", {
        className: styles.daysContainer,
        style: i === 0 ? firstSection : null
      }, days)));
      days = [];
    }

    return /*#__PURE__*/React.createElement("div", {
      id: "container",
      className: styles.dateListScrollable
    }, months);
  };

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
            view.scrollIntoView({
              behavior: "smooth",
              inline: "center",
              block: "nearest"
            });
          }
        }, 20);
      }
    }
  }, [selectDate]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, renderDays());
};

export { DateView };