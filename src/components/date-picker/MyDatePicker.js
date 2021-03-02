import React from "react";
import DatePicker from "react-datepicker";

const MyDatePicker = (props) => {
    const { todo, handleDateChange, disabled } = props;
    const startDate = new Date(todo.date);

    return (
        <>
            <DatePicker
                className="pl-2 font-semibold w-36 md:min-w-min"
                selected={startDate}
                onChange={(date) => handleDateChange(todo.id, date)}
                disabled={disabled}
                dateFormat="d  MMMM  yyyy"
            />
        </>
    );
};

export default MyDatePicker;
