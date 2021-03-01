import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <>
            <div className="flex items-center max-h-screen mt-32 text-gray-800">
                <div className="container flex flex-wrap items-center p-4 mx-auto">
                    <div className="w-full p-4 text-center md:w-5/12">
                        <img
                            src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/page_not_found_su7k.svg"
                            alt="Not Found"
                        />
                    </div>
                    <div className="w-full p-4 text-center md:w-7/12 md:text-left">
                        <div className="text-6xl font-medium">404</div>
                        <div className="mb-4 text-xl font-medium md:text-3xl">
                            Oops. This page has gone missing.
                        </div>
                        <div className="mb-8 text-lg">
                            You may have mistyped the address or the page may
                            have moved.
                        </div>
                        <Link
                            className="p-4 font-semibold text-white transition-all duration-300 bg-indigo-700 border border-gray-800 rounded shadow-lg hover:shadow-xl hover:bg-indigo-600"
                            to="/"
                        >
                            Go Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Error;
