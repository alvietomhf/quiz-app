import React from "react";
import { LinearProgress } from "@material-ui/core";

const LoadingProgress = () => {
    return (
        <LinearProgress
            style={{
                position: "absolute",
                top: "-3px",
                width: "206vh",
                height: "8px",
                left: "-8px",
            }}
        />
    );
};

export default LoadingProgress;
