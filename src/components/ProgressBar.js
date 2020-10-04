import React from 'react';

function ProgressBar({className, percent = 40, big=false, color=null}){
    let progressClassName = "progress " + className;
    if (big) {
        progressClassName += " progress--big";
    }
    if (color === 'red') {
        progressClassName += ' progress--color--red';
    }
    return <div className={"progress " + progressClassName} style={{'--percent': `${percent}%`}}></div>
}

export default ProgressBar;