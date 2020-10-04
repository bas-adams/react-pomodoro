import React from 'react';

function ProgressBar({className, percent = 40}){
    return <div className={"ProgressBar " + className} style={{'--progress': `${percent}%`}}></div>
}

export default ProgressBar;