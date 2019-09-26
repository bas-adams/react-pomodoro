import React from 'react';

function Clock({ className = "", minutes = 20, seconds = 48 }) {
    return <h2 className={"clock " + className}>Pozostało 
        <span className="clock--minutes"> {minutes}</span>
        <span className="clock--separator">:</span>
        <span className="clock--seconds">{seconds}</span>
    </h2>
}

export default Clock;