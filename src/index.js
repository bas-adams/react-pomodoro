import React from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuid } from 'uuid';

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

/* Komponent klasowy */

class CurrentTimeBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isRuning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSecond: 0,
        }

        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.togglePauses = this.togglePauses.bind(this);
    }
    // nie możemy bezpośrednio modyfikować zmiennej stanowej powinniśmy zawsze urzywać metody setState().
    // Jeżeli zmienimy stan ręcznie to REact nie będzie wiedział że state się zmienił i nie będzie aktualizował naszych komponentów

    handleStart(event){
        this.setState({
            isRuning: true
        });
        this.startTimer();
    }

    handleStop(event){
        this.setState({
            isRuning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSecond: 0
        });
        this.stopTimer();
    }

    startTimer() {
        // function(){}.bind(this), ten sam efekt można uzyskać urzywając funckcji strzałkowej

        this.intervalID = window.setInterval(
            () => {
                this.setState(
                    (prevState) => ({ elapsedTimeInSecond: prevState.elapsedTimeInSecond + 0.1 })
                );
            },
            100
        );
    }

    stopTimer(){
        window.clearInterval(this.intervalID);
    }

    togglePauses() {
        this.setState(
            function(prevState){
                const isPaused = !prevState.isPaused;
                if(isPaused){
                    this.stopTimer();
                } else {
                    this.startTimer();
                }
                return({
                    isPaused,
                    pausesCount: isPaused ? prevState.pausesCount + 1 : prevState.pausesCount
                });     
            }
        );
    }

    render() {
        const { isRuning, isPaused, pausesCount, elapsedTimeInSecond } = this.state;
        const { title, totalTimeInMinutes, isEditable, onEdit } = this.props;
        const totalTimeInSecond = totalTimeInMinutes * 60;
        const timeLeftInSecond = totalTimeInSecond - elapsedTimeInSecond;
        const minutesLeft = Math.floor(timeLeftInSecond/60);
        const secondLeft = Math.floor(timeLeftInSecond%60);
        const progressInPercent = (elapsedTimeInSecond / totalTimeInSecond) * 100.0;

        return(
            <div className={`CurrentTimebox  ${isEditable ? "inactive" : ""}`}>
                <h1>{title}</h1>
                <Clock minutes={minutesLeft} second={secondLeft} className={isPaused ? 'inactive' : ""}/>
                <ProgressBar percent={progressInPercent} className={isPaused ? 'inactive' : ""}/>
                <button onClick={onEdit} disabled={isEditable}>Edytuj</button>
                <button onClick={this.handleStart} disabled={isRuning}>Start</button>
                <button onClick={this.handleStop} disabled={!isRuning}>Stop</button>
                <button onClick={this.togglePauses} disabled={!isRuning}>{isPaused ? 'Wznów' : 'Pauzuj'}</button>
                Liczba przerw: {pausesCount}
            </div>
        );
    };
}

/* komponent fukncyjny */
function Clock({className, minutes, second }) {
    return <h2 className={"Clock " + className}>Pozostało {minutes}:{second}</h2>;
}

function ProgressBar({className, percent = 40}){
    return <div className={"ProgressBar " + className} style={{'--progress': `${percent}%`}}></div>
}


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

function TimeboxCreator({ onCreate }) {
    return(
        /* w input zamiast value to defaultValue */
        <div className="TimeboxCreator">
            <label>Co robisz? 
                <input 
                    type="text" 
                />
            </label><br />
            <label>Ile minut? 
                <input 
                    type="numbe" 
                />
            </label><br />
            <button 
                onClick={onCreate}
            >Dodaj timebox</button>
        </div>
    );
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

    handlerCreate = () => {
        this.addTimebox({ id: uuid.v4(), title: 'Nowy timebox', totalTimeInMinutes: 25 });
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

    render() {
        return (
            <>
                <TimeboxCreator 
                    onCreate={this.handlerCreate} 
                />
                {this.state.timeboxes.map( (timebox, index) => (
                    <Timebox 
                        key={timebox.id} 
                        title={timebox.title} 
                        totalTimeInMinutes={timebox.totalTimeInMinutes} 
                        onDelete={() => this.removeTimebox(index) }
                        onEdit={ () => this.updateTimebox(index, {...timebox, title: "Updatd timebox"}) }
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

    /* komponent fukncyjny */
    function App() {
    return (
        <div className="App">
            <TimeboxList />
            <EdiatbelTimebox />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));