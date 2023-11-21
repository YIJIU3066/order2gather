import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

const Picker = () => {
  const [date, setDate] = useState(new Date());
  const currentYear = getYear(new Date());
  const startYear = 2010;
  const endYear = 2025;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderCustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className="flex justify-around text-base text-center ">
      <button
        aria-label="Previous Month"
        className="justify-center items-center mx-2"
        onClick={decreaseMonth}
      >
        {"<"}
      </button>
      <select
        value={getYear(date)}
        onChange={({ target: { value } }) => changeYear(value)}
        className="border-2 p-2 mr-2 text-gray-900 text-base rounded-md focus:ring-blue focus:border-blue focus:outline-none block "
      >
        {years.map((option) => (
          <option key={option} value={option} className="">
            {option}
          </option>
        ))}
      </select>

      <select
        className="border-2 text-gray-900 text-base rounded-md focus:ring-blue focus:border-blue focus:outline-none block p-2"
        value={months[getMonth(date)]}
        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
      >
        {months.map((option) => (
          <option key={option} value={option} className="block p-2">
            {option}
          </option>
        ))}
      </select>
      <button
        aria-label="Next Month"
        className="justify-center items-center mx-2"
        onClick={increaseMonth}
      >
        {">"}
      </button>
    </div>
  );

  useEffect(() => {
    console.log(date);
  }, [date]);
  
  return (
    <>
      <FontAwesomeIcon icon={faCalendar} style={{ color: "#7A989A", marginRight: "12px" }}/>
      <DatePicker
        id="orderEnd"
        selected={date}
        onChange={(date) => setDate(date)}
        timeInputLabel="Time"
        showTimeSelect
        // showTimeInput
        // todayButton="Today"
        timeIntervals={10}
        dateFormat="yyyy/MM/dd h:mm aa"
        renderCustomHeader={renderCustomHeader}
        popperModifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 5],
            },
          },
        ]}
        className="shadow appearance-none border-2 rounded py-2 px-3 text-base cursor-pointer leading-tight focus:outline-none focus:shadow-outline focus:border-blue"
      />
      {/* <DatePickerWrapperStyles /> */}
    </>
  );
};

export default Picker;
