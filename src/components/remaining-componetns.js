import React from 'react';
import { v4 as uuid } from 'uuid';


import TimeboxEditor from './TimeboxEditor';
import CurrentTimeBox from './CurrentTimeBox';
import TimeboxListEditor from './TimeboxListEditor';

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

class TimeboxCreator extends React.Component {

    constructor(props){
        super();
        //specjalne obiekty które pozowlą nam przechowywać referencje do pól formularza
        //tworzymy je za pomocą funkcji z API reacta o nazwie createRef
        //jedna będzie trzymała pole tytułu a druga całkowity czas w minutach

        this.titleInput = React.createRef();
        this.totalTimeInMinutesInput = React.createRef();
    }


    // state = {
    //     title: '',
    //     totalTimeInMinutes: ''
    // }

    // handleTitleChange = (event) => {
    //     this.setState({
    //         title: event.target.value
    //     });
    // }

    // handleTotalTimeInMinutesChange = ( event ) => {
    //     this.setState({
    //         totalTimeInMinutes: event.target.value
    //     })
    // }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onCreate({
            id: uuid,
            //title: this.state.title,
            //totalTimeInMinutes: this.state.totalTimeInMinutes
            title: this.titleInput.current.value,
            totalTimeInMinutes: this.totalTimeInMinutesInput.current.value
        });
        //czyszczenie formularza jak są dane w state
        //this.setState({title: '', totalTimeInMinutes: ''});
        
        //czyszczenie formularza jak są dane z ref
        this.titleInput.current.value = '';
        this.totalTimeInMinutesInput.current.value = '';
    }

    render() {
        return(
            /* w input zamiast value to defaultValue */
            <form onSubmit = {this.handleSubmit}
                className = "TimeboxCreator">

                <label>Co robisz?
                    <input
                    //usuwamy kod synchronizujący wartosc ze stanem ale dodajemy specjalne property ref do którego przypisujemy naszą zmienną referncyjną.
                       // value={this.state.title}
                       // onChange={this.handleTitleChange}
                       ref = { this.titleInput }
                        type="text"
                    />
                </label><br />
                <label>Ile minut?
                    <input
                        //value={this.state.totaltimeInMinutes}
                        //onChange={this.handleTotalTimeInMinutesChange}
                        ref = {this.totalTimeInMinutesInput}
                        type="numbe"
                    />
                </label><br />
                <button>Dodaj timebox</button>
            </form>
        );
    }
};

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

function Timebox({ title, totalTimeInMinutes, onDelete, onEdit }) {
    return(
        <div className="Timebox">
            <h3>{title} - {totalTimeInMinutes}</h3>
            <button onClick={onDelete}>Usuń</button>
            <button onClick={onEdit}>Zmień</button>
        </div>
    );
}

export {TimeboxList, EdiatbelTimebox};