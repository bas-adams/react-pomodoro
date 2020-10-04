import React from 'react';

import TimeboxEditor from './TimeboxEditor';
import CurrentTimeBox from './CurrentTimeBox';

/* komponent klasowy  zamiast dodawać pusty element div można użyć React.Fragment albo jego skrótową wersje <> */
class EdiatbelTimebox extends React.Component {
    // dodawanie stanu do komponentu
    // stan można dodać poprzez konstruktor albo urzywając właściwości klasy
    state = {
        title: "Ucze się skrótów klawiszowych",
        totalTimeInMinutes: 15,
        isEditable: true,
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value })
    }

    handleTotolTimeInMinutes = (event) => {
        this.setState({ totalTimeInMinutes: event.target.value })
    }

    handlerConfirm = () => {
        this.setState({ isEditable: false });
    }

    handlerEdit = () => {
        this.setState({ isEditable: true });
    }

    render() {
        const { title, totalTimeInMinutes, isEditable } = this.state;
        return (
            <>
                <TimeboxEditor 
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    isEditable={isEditable }
                    onConfirm={this.handlerConfirm}
                    onTitleChange={this.handleTitleChange}  
                    onTotalTimeInMinuteChange={this.handleTotolTimeInMinutes}
                />
                <CurrentTimeBox 
                    title={title} 
                    totalTimeInMinutes={totalTimeInMinutes} 
                    isEditable={isEditable}
                    onEdit={this.handlerEdit}
                />
            </>
        )
    }
}

export default EdiatbelTimebox;
