import React, { FC } from "react";
import { Skeleton } from "@material-ui/lab";

interface LoadingProps {
    count?: number;
}

const Loading: FC<LoadingProps> = (props) => {
    const { count = 1 } = props;
    const size = window.innerWidth;

    return (
        <>
            <div className="container mt-52">
                {[...Array(count)].map((x, i) => {
                    return (
                        <div
                            key={i}
                            className="flex flex-col content-center justify-center mx-auto"
                        >
                            <div className="flex flex-col mt-6">
                                <Skeleton
                                    className="self-center mr-2"
                                    animation="wave"
                                    variant="text"
                                    width={size / 1.2}
                                    height={2}
                                />
                                <div className="flex self-center">
                                    <Skeleton
                                        className="self-center mt-1 mr-2 rounded"
                                        animation="wave"
                                        variant="rect"
                                        width={37}
                                        height={36}
                                    />
                                    <Skeleton
                                        className="self-center mr-2"
                                        animation="wave"
                                        variant="text"
                                        width={size / 1.3}
                                        height={60}
                                    />
                                </div>
                                <Skeleton
                                    className="self-center mr-2"
                                    animation="wave"
                                    variant="text"
                                    width={size / 1.2}
                                    height={2}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Loading;
