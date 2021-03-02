import React, { FC } from "react";

interface FilterGroupButtonProps {
    handleFilter: HandleFilter;
    selectedFilter: string;
}

const FilterGroupButton: FC<FilterGroupButtonProps> = (props) => {
    const { handleFilter, selectedFilter } = props;

    const active = "text-ribbonBlue bg-white";
    const deActive = "text-gray-600 bg-gray-50";

    return (
        <>
            <div className="flex flex-wrap items-baseline justify-center">
                <div className="flex m-2 text-gray-600">
                    <button
                        onClick={() => handleFilter("month")}
                        className={`rounded-l-none filterGroup-btn ${
                            selectedFilter === "month" ? active : deActive
                        }`}
                    >
                        <span className="flex leading-5">Month</span>
                    </button>
                    <button
                        onClick={() => handleFilter("week")}
                        className={`filterGroup-btn border-l-0 border-r-0 rounded-l-none rounded-r-none ${
                            selectedFilter === "week" ? active : deActive
                        }`}
                    >
                        <span className="flex leading-5">Week</span>
                    </button>
                    <button
                        onClick={() => handleFilter("day")}
                        className={`filterGroup-btn rounded-r-none ${
                            selectedFilter === "day" ? active : deActive
                        }`}
                    >
                        <span className="flex leading-5">Day</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default FilterGroupButton;
