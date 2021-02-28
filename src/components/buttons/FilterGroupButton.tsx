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
                        className={`flex hover:bg-gray-100 justify-center px-4 py-2 text-base font-semibold transition duration-200 ease-in-out border rounded rounded-l-none cursor-pointer hover:scale-110 focus:outline-none ${
                            selectedFilter === "month" ? active : deActive
                        }`}
                    >
                        <span className="flex leading-5">Month</span>
                    </button>
                    <button
                        onClick={() => handleFilter("week")}
                        className={`flex hover:bg-gray-100 justify-center px-4 py-2 text-base font-semibold transition duration-200 ease-in-out border border-l-0 border-r-0 rounded rounded-l-none rounded-r-none cursor-pointer hover:scale-110 focus:outline-none ${
                            selectedFilter === "week" ? active : deActive
                        }`}
                    >
                        <span className="flex leading-5">Week</span>
                    </button>
                    <button
                        onClick={() => handleFilter("day")}
                        className={`flex hover:bg-gray-100 justify-center px-4 py-2 text-base font-semibold transition duration-200 ease-in-out border rounded rounded-r-none cursor-pointer hover:scale-110 focus:outline-none ${
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
