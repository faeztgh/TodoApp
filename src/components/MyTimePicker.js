import React, { useState } from "react";
import DatePicker from "react-datepicker";

const MyTimePicker = (props) => {
    const { todo, handleTimeChange, disabled } = props;
    const [startTime, setStartTime] = useState(new Date(todo.time));

    return (
        <>
            <DatePicker
                className="w-20 pl-2 font-semibold cursor-pointer lg:min-w-max"
                selected={startTime}
                onChange={(date) => handleTimeChange(todo.id, date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                disabled={disabled}
                timeCaption="Time"
                dateFormat="h:mm aa"
            />
        </>
    );
};

export default MyTimePicker;
