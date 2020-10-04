import React from 'react';
import classNames from 'classnames';

function ProgressBar({className, percent = 40, big=false, color=null}){
    /* przed uzyciem biblioteki classname 
    let progressClassName = "progress " + className;
    if (big) {
        progressClassName += " progress--big";
    }
    if (color === 'red') {
        progressClassName += ' progress--color--red';
    }
    */

    let progressClassName = classNames(
        "progress",
        className,
        {
            "progress--big": big,
            "progress--color--red": color === "red"
        }
        );

    return <div className={progressClassName} style={{'--percent': `${percent}%`}}></div>
}

export default ProgressBar;