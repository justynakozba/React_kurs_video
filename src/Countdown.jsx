import React from "react";
import PropTypes from "prop-types";
import { hourMinuteToSecond, secondsToHourMinuteSecond} from "./utils";

import "./Countdown.css";
import "./../node_modules/semantic-ui-css/semantic.css";

const Countdown = props => {
    const eventInSeconds = hourMinuteToSecond(props.hour, props.minute);
    const nowInSeconds = hourMinuteToSecond(props.timeNow.hour, props.timeNow.minute) + props.timeNow.second;

    const diff = eventInSeconds - nowInSeconds;
    const diffText = diff > 0 ? secondsToHourMinuteSecond(diff): "tomorrow";

    return (
    <div className="countdown">
        <strong>{props.name}</strong> - {diffText}
        <div className="countdown__icons">
            <i className = "icon edit" onClick={() => props.onEditInit(props.id)}/>
           <i className= "icon times" onClick={() => props.onRemove(props.id)} />
        </div>
    </div>
 );
};

// Validation
Countdown.propTypes = {
    name: PropTypes.string,
    hour: PropTypes.number,
    minute: PropTypes.number,
    onEditInit: PropTypes.func,
    timeNow: PropTypes.shape({
        hour: PropTypes.number,
        minute: PropTypes.number,
        second: PropTypes.number
    }),
    onRemove: PropTypes.func
};
export default Countdown;