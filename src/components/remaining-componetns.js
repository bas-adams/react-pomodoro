import React from 'react';

import Timebox from './Timebox';
import TimeboxCreator from './TimeboxCreator';
import TimeboxListEditor from './TimeboxListEditor';


class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            {id:"a", title: 'Uczę się list', totalTimeInMinutes: 15 },
            {id:"b", title: 'Uczę się formularzy', totalTimeInMinutes: 25 },
            {id:"c", title: 'Uczę się komponentów niekontrolowanych', totalTimeInMinutes: 35 },
        ]
    }

    addTimebox = (timebox) => {
        this.setState(prevState => {
            const timeboxes = [timebox, ...prevState.timeboxes];
            return { timeboxes };
        })
    }

    handlerCreate = (createdTimebox) => {
        this.addTimebox(createdTimebox);
    }

    removeTimebox = (indexToRemove) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter( (timebox,index) => index !== indexToRemove );
            return { timeboxes };
        });
    }

    updateTimebox = (indexToUpdate, updatedTimebox) => {
        this.setState( prevState => {
            const timeboxes = prevState.timeboxes.map( (timebox, index) => {
                return index === indexToUpdate ? updatedTimebox : timebox;
            });
            return { timeboxes };
        });
    }

    handleTitleChange = (event) => {
        console.log(event.target.value)
        this.setState({ title: event.target.value })
    }

    handleEdit = (indexToUpdate, updatedTimebox) => {
        this.setState( prevState => {
            const timeboxes = prevState.timeboxes.map( (timebox, index) => {
                console.log(indexToUpdate, updatedTimebox)
                return index === indexToUpdate ? updatedTimebox : timebox;
            });
            return { timeboxes };
        } )
    }

    render() {
        return (
            <>
                <TimeboxCreator
                    onCreate={this.handlerCreate}
                />

                <TimeboxListEditor
                    title
                    onTitleChange={this.handleTitleChange}
                />

                {this.state.timeboxes.map( (timebox, index) => (
                    <Timebox
                        key={timebox.id}
                        title={timebox.title}
                        totalTimeInMinutes={timebox.totalTimeInMinutes}
                        onDelete={() => this.removeTimebox(index) }
                        //onEdit={ () => this.updateTimebox(index, {...timebox, title: "Updatd timebox"}) }
                    />
                ))}
            </>
        );
    };
}



export {TimeboxList};