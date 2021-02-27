import React, { useState } from "react";
import DatePicker from "react-datepicker";

const MyDatePicker = (props) => {
    const { todo, handleDateChange, disabled } = props;
    const [startDate, setStartDate] = useState(new Date(todo.date));

    return (
        <>
            <DatePicker
                className="pl-2 font-semibold cursor-pointer w-36 md:min-w-min"
                selected={startDate}
                onChange={(date) => handleDateChange(todo.id, date)}
                disabled={disabled}
                dateFormat="d  MMMM  yyyy"
            />
        </>
    );
};

export default MyDatePicker;
