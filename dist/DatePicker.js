/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./DatePicker.module.css";
import { addDays, addMonths, differenceInMonths, format, isSameDay, lastDayOfMonth, startOfMonth } from "date-fns";
export default function DatePicker({
  endDate,
  selectDate,
  getSelectedDay,
  color,
  labelFormat
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const firstSection = {
    marginLeft: '40px'
  };
  const startDate = new Date();
  const lastDate = addDays(startDate, endDate || 90);
  const primaryColor = color || 'rgb(54, 105, 238)';
  const selectedStyle = {
    fontWeight: "bold",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    border: `2px solid ${primaryColor}`,
    color: primaryColor
  };
  const buttonColor = {
    background: primaryColor
  };
  const labelColor = {
    color: primaryColor
  };

  const getStyles = day => {
    if (isSameDay(day, selectedDate)) {
      return selectedStyle;
    }

    return null;
  };

  const getId = day => {
    if (isSameDay(day, selectedDate)) {
      return 'selected';
    } else {
      return "";
    }
  };

  function renderDays() {
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
        days.push( /*#__PURE__*/React.createElement("div", {
          id: `${getId(addDays(startDate, j))}`,
          className: styles.dateDayItem,
          style: getStyles(addDays(month, j)),
          key: addDays(month, j),
          onClick: () => onDateClick(addDays(month, j))
        }, /*#__PURE__*/React.createElement("div", {
          className: styles.dayLabel
        }, format(addDays(month, j), dayFormat)), /*#__PURE__*/React.createElement("div", {
          className: styles.dateLabel
        }, format(addDays(month, j), dateFormat))));
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

  const nextWeek = () => {
    const e = document.getElementById('container');
    const width = e ? e.getBoundingClientRect().width : null;
    e.scrollLeft += width - 60;
  };

  const prevWeek = () => {
    const e = document.getElementById('container');
    const width = e ? e.getBoundingClientRect().width : null;
    e.scrollLeft -= width - 60;
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.buttonWrapper
  }, /*#__PURE__*/React.createElement("button", {
    className: styles.button,
    style: buttonColor,
    onClick: prevWeek
  }, "\u2190")), renderDays(), /*#__PURE__*/React.createElement("div", {
    className: styles.buttonWrapper
  }, /*#__PURE__*/React.createElement("button", {
    className: styles.button,
    style: buttonColor,
    onClick: nextWeek
  }, "\u2192")));
}
/*more pictures
* example code sandbox
* update readme*/