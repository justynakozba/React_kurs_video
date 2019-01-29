import React, { Component } from 'react';
import uniqid from "uniqid";

import "./App.css";
import Countdown from "./Countdown";
import EditEvent from "./EditEvent";

class App extends Component {
    constructor() {
        super();
        this.state = {
            now: {
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                second: new Date().getSeconds()
            },
            events: [],
            editedEvents: {
                id: uniqid(),
                name:"",
                hour: -1,
                minute: -1
            }
        };
        this.timer= this.timer.bind(this);
        this.handleEditEvent = this.handleEditEvent.bind(this);
        this.handleSaveEvent = this.handleSaveEvent.bind(this);
        this.handleRemoveEvent = this.handleRemoveEvent.bind(this);
        this.handleEditInit = this.handleEditInit.bind(this);
        this.handleEditCancel =this.handleEditCancel.bind(this);
    }

    timer() {
        this.setState({
            now: {
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                second: new Date().getSeconds()
            }
        })
    }

    componentDidMount(){
        const storageEvents = JSON.parse(localStorage.getItem("events") || [] );
        this.setState({events: storageEvents });

        const intervalId = setInterval(this.timer,1000);
        this.setState({intervalId: intervalId});
    }

    componentWillUnmount(){
        clearInterval(this.state.intervalId);
    }

    handleEditEvent(val) {
        this.setState(prevState => {
            return {
                editedEvents: Object.assign(prevState.editedEvents, val)
            };
        });
    }

    handleSaveEvent() {
        this.setState(prevState => {
            const editedEventExist = prevState.events.find(
                el => el.id ===prevState.editedEvents.id
        );

        let updatedEvents;
        if (editedEventExist) {
            updatedEvents = prevState.events.map(el => {
               if (el.id === prevState.editedEvents.id) return prevState.editedEvents;
               else return el;
            });
        }
        else {
            updatedEvents = [...prevState.events, prevState.editedEvents]
        }

        return {
            events: updatedEvents,
            editedEvents:{id: uniqid(), name: "", hour: -1, minute: -1}
        };
    },
    () => localStorage.setItem("events", JSON.stringify(this.state.events))
    );


        /*this.setState(prevState =>({
            events: [...prevState.events, prevState.editedEvents],
            editedEvents: {
                id:uniqid(),
                name:"",
                hour:"",
                minute:""
            }
        }));*/
    }

    handleRemoveEvent(id) {
        this.setState(prevState => ({
            events: prevState.events.filter(el => el.id !== id)
        }),
        () => localStorage.setItem("events", JSON.stringify(this.state.events))
        );
    }

    handleEditInit(id) {
        this.setState(prevState => ({
            editedEvents: {...prevState.events.find(el => el.id === id)} // object spread - stworzenie nie referencji do obiektu a tworzenie nowego obiektu
        }));
    }

    handleEditCancel(){
        this.setState({
            editedEvents: { id: uniqid(), name: "", hour: -1, minute: -1 }
        });
    }

    render() {
        const events = this.state.events.map(el => {
            return <Countdown
            key={el.id}
            id={el.id}
            name={el.name}
            hour={el.hour}
            minute={el.minute}
            timeNow ={this.state.now}
            onRemove={id => this.handleRemoveEvent(id)}
            onEditInit={id => this.handleEditInit(id)}
            />;
        })
        return (
        <div className="app">
            {events}
            <EditEvent
                name={this.state.editedEvents.name}
                hour={this.state.editedEvents.hour}
                minute={this.state.editedEvents.minute}
                onInputChange={val => this.handleEditEvent(val)}
                onSave={() => this.handleSaveEvent()}
                onCancel={()=>this.handleEditCancel()}
                />
        </div>
        );
    }
}

export default App;