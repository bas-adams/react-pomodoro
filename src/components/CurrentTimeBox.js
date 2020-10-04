import React from 'react';

import Clock from './Clock';
import ProgressBar from './ProgressBar';

/* Komponent klasowy */
class CurrentTimeBox extends React.Component {
    constructor(props){
        super();
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

export default CurrentTimeBox;