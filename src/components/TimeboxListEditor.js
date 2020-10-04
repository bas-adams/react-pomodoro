import React from 'react';

function TimeboxListEditor (props) {
    const {
        title,
        totalTimeInMinutes,
        onTitleChange,
        onConfirm
    } = props;

    return (
        <div className='TimeboxListEditor'>
        <label>Co robisz?
            <input
                defaultValue={title}
                type="text"
                onChange={onTitleChange}
            />
        </label><br />
        <label>Ile minut?
            <input
                defaultValue={totalTimeInMinutes}
                type="numbe"
            />
        </label><br />
        <button  onClick={onConfirm}>
            Zatwierdź zmiany
        </button>
    </div>
    )
}

export default TimeboxListEditor;