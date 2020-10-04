import React from 'react';

/* komponent fukncyjny */
function Clock({className, minutes, second }) {
    return <h2 className={"Clock " + className}>Pozostało {minutes}:{second}</h2>;
}

export default Clock;