import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';

import Clock from './components/Clock';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


function ProgressBar({ className = "", percent = 33 }) {
    return (
        <div className={"ProgressBar " + className}>
            <div style={{width: `${percent}%`}}></div>
        </div>
    );
}

function TimeboxEditor(props) {
    const { 
        title, 
        totalTimeInMinutes,
        isEditable,
        onTitleChange,
        onTotalTimeInMinutesChange,
        onConfirm
    } = props;
    return (
        <div className={`TimeboxEditor ${isEditable ? "" : "inactive"}`}>
            <label>
                Co robisz?
                <input 
                    disabled={!isEditable} 
                    value={title}
                    onChange={onTitleChange} 
                    type="text" 
                />
            </label><br/>
            <label>
                Ile minut?
                <input 
                    disabled={!isEditable} 
                    value={totalTimeInMinutes}
                    onChange={onTotalTimeInMinutesChange} 
                    type="number" 
                />
            </label><br />
            <button 
                onClick={onConfirm}
                disabled={!isEditable}
            >Zatwierdź zmiany</button>
        </div>
    )
}

class CurrentTimebox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        }
        this.handleStart = this.handleStart.bind(this)
        this.handleStop = this.handleStop.bind(this)
        this.togglePause = this.togglePause.bind(this)
    }
    handleStart(event) {
        this.setState({
            isRunning: true
        })
        this.startTimer();
    }
    handleStop(event) { 
        this.setState({
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        })
        this.stopTimer();
    }
    startTimer() {
        this.intervalId = window.setInterval(
            () => {
                this.setState(
                    prevState => ({ elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1 })
                )
            },
            100
        );
    }
    stopTimer() {
        window.clearInterval(this.intervalId);
    }
    togglePause() {
        this.setState(
            function(prevState) {
                const isPaused = !prevState.isPaused;
                if (isPaused) {
                    this.stopTimer();
                } else {
                    this.startTimer();
                }
                return {
                    isPaused,
                    pausesCount: isPaused ? prevState.pausesCount + 1 : prevState.pausesCount
                }
            }
        )
    }
    render() {
        const { isPaused, isRunning, pausesCount, elapsedTimeInSeconds } = this.state;
        const { title, totalTimeInMinutes, isEditable, onEdit } = this.props;
        const totalTimeInSeconds = totalTimeInMinutes * 60;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const minutesLeft = Math.floor(timeLeftInSeconds / 60);
        const secondsLeft = Math.floor(timeLeftInSeconds % 60);
        const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;
        return (
            <div className={`CurrentTimebox ${isEditable ? "inactive" : ""}`}>
                <h1>{title}</h1>
                <Clock minutes={minutesLeft} seconds={secondsLeft} className={isPaused ? "inactive" : ""}/>
                <ProgressBar percent={progressInPercent} className={isPaused ? "inactive" : ""}/>
                <button onClick={onEdit} disabled={isEditable}>Edytuj</button>
                <button onClick={this.handleStart} disabled={isRunning}>Start</button>
                <button onClick={this.handleStop} disabled={!isRunning}>Stop</button>
                <button onClick={this.togglePause} disabled={!isRunning}>{isPaused ? "Wznów" : "Pauzuj"}</button>
                Liczba przerw: {pausesCount}
            </div>
        )
    }
}

class EditableTimebox extends React.Component {
    state = {
        title: "Uczę się CSS!",
        totalTimeInMinutes: 20,
        isEditable: true
    }
    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }
    handleTotalTimeInMinutesChange = (event) => {
        this.setState({ totalTimeInMinutes: event.target.value });
    }
    handleConfirm = () => {
        this.setState({ isEditable: false });
    }
    handleEdit = () => {
        this.setState({ isEditable: true });
    }
    render() {
        const { title, totalTimeInMinutes, isEditable } = this.state;
        return (
            <>
                <TimeboxEditor 
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    isEditable={isEditable}
                    onConfirm={this.handleConfirm}
                    onTitleChange={this.handleTitleChange}
                    onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
                />
                <CurrentTimebox 
                    isEditable={isEditable}
                    title={title} 
                    totalTimeInMinutes={totalTimeInMinutes} 
                    onEdit={this.handleEdit}
                />
            </>
        )
    }
}

class TimeboxCreator extends React.Component {
    constructor(props) {
        super(props);
        this.titleInput = React.createRef();
        this.totalTimeInMinutesInput = React.createRef();
    }
    handleSubmit = (event) => {
        event.preventDefault(); 
        this.props.onCreate({ 
            id: uuid.v4(), 
            title: this.titleInput.current.value, 
            totalTimeInMinutes: this.totalTimeInMinutesInput.current.value
        });
        this.titleInput.current.value = "";
        this.totalTimeInMinutesInput.current.value = "";
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="TimeboxCreator">
                <label>
                    Co robisz?
                    <input 
                        ref={this.titleInput}
                        type="text" 
                    />
                </label><br/>
                <label>
                    Ile minut?
                    <input 
                        ref={this.totalTimeInMinutesInput}
                        type="number" 
                    />
                </label><br />
                <button 
                >Dodaj timebox</button>
            </form>
        )
    }
}
class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { id: "a", title: "Uczę się CSS in JS", totalTimeInMinutes: 25 },
            { id: "b", title: "Uczę się SASS", totalTimeInMinutes: 15 },
            { id: "c", title: "Uczę się BEM", totalTimeInMinutes: 5 },
        ]
    }

    addTimebox = (timebox) => {
        this.setState(prevState => {
            const timeboxes = [timebox, ...prevState.timeboxes];
            return { timeboxes };
        })
    }
    removeTimebox = (indexToRemove) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
            return { timeboxes };
        })
    }
    updateTimebox = (indexToUpdate, updatedTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox, index) =>
                index === indexToUpdate ? updatedTimebox : timebox
            )
            return { timeboxes };
        })
    }

    handleCreate = (createdTimebox) => {
        this.addTimebox(createdTimebox);
    }
    render() {
        return (
            <>
                <TimeboxCreator onCreate={this.handleCreate} />
                {this.state.timeboxes.map((timebox, index) => (
                    <Timebox 
                        key={timebox.id} 
                        title={timebox.title} 
                        totalTimeInMinutes={timebox.totalTimeInMinutes}
                        onDelete={() => this.removeTimebox(index)}
                        onEdit={() => this.updateTimebox(index, {...timebox, title: "Updated timebox"})}
                    />
                ))}
            </>
        )
    }
}
function Timebox({ title, totalTimeInMinutes, onDelete, onEdit }) {
    return (
        <div className="Timebox">
            <h3>{title} - {totalTimeInMinutes} min.</h3>
            <button onClick={onDelete} >Usuń</button>
            <button onClick={onEdit}>Zmień</button>
        </div>
    )
}
function App() {
    return (
        <div className="App">
            <TimeboxList />
            <EditableTimebox />
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById("root"));