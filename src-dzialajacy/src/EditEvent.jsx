import React from "react";
import PropTypes from "prop-types";
import "./EditEvent.css";
import { isValidNumberInput, parseInputAsNumber, isValidString } from "./utils";

const EditEvent = props => {
  /* const isFormValid =
    isValidString(props.name) && isValidString(props.deadline);*/
  const isFormValid = true;
  const isFormEmpty = props.content === "" && props.deadline === "";

  return (
    <div className="edit-event">
      <div className="edit-event__input-group">
        <label htmlFor="content">content</label>
        <input
          type="text"
          id="content"
          name="content"
          value={props.content}
          onChange={e =>
            props.onInputChange({ [e.target.name]: e.target.value })
          }
        />
      </div>
      <div className="edit-event__input-group">
        <label htmlFor="deadline">deadline</label>
        <input
          type="date"
          data-date-inline-picker="true"
          id="deadline"
          name="deadline"
          value={props.deadline === "" ? "" : props.deadline}
          onKeyPress={e => isValidString(e)}
          onChange={e =>
            props.onInputChange({ [e.target.name]: e.target.value })
          }
        />
      </div>
      <button disabled={!isFormValid} onClick={() => props.onSave()}>
        Add
      </button>
      <button disabled={isFormEmpty} onClick={() => props.onCancel()}>
        Clear
      </button>
    </div>
  );
};

EditEvent.propTypes = {
  content: PropTypes.string,
  deadline: PropTypes.string,
  onInputChange: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func
};
export default EditEvent;
