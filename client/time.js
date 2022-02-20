import React from "react";

const TimeCompoent = () => {
    const today = new Date();
    return (
        <p>{today.toISOString()}</p>
    )
}

export default TimeCompoent;