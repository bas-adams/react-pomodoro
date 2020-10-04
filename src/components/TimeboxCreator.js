import React from 'react';
import { v4 as uuid } from 'uuid';

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

export default TimeboxCreator;