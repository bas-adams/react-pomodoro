import React from 'react';

/* komponent funkcyjny */
function TimeboxEditor(props) {
    const { 
            title, 
            totalTimeInMinutes,
            isEditable,
            onTitleChange,
            onTotalTimeInMinuteChange,
            onConfirm,
        } = props;
        
    return(
        /* w input zamiast value to defaultValue */
        <div className={`TimeboxEditor ${isEditable ? "" : "inactive"}`}>
            <label>Co robisz? 
                <input 
                    disabled={!isEditable} 
                    value={title} 
                    onChange={onTitleChange}
                    type="text" 
                />
            </label><br />
            <label>Ile minut?
                <input
                    disabled={!isEditable}
                    value={totalTimeInMinutes}
                    onChange={onTotalTimeInMinuteChange}
                    type="numbe"
                />
            </label><br />
            <button
                onClick={onConfirm}
                disabled={!isEditable}
            >
                Zatwierdź zmiany
            </button>
        </div>
    );
};

export default TimeboxEditor;