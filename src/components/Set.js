import React, { useContext, useState } from "react";
import { SettingsContext } from "../context/Settings";
const Set = () => {
  const [newTimer, setNewTimer] = useState({
    work: 0,
    short: 0,
    active: "work",
  });

  const { updateExecute } = useContext(SettingsContext);

  const handleChange = (input) => {
    const { name, value } = input.target;
    switch (name) {
      case "work":
        setNewTimer({
          ...newTimer,
          work: parseInt(value),
        });
        break;
      case "shortBreak":
        setNewTimer({
          ...newTimer,
          short: parseInt(value),
        });
        break;

      default:
        setNewTimer(0);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateExecute(newTimer);
  };
  return (
    <div className="form-container">
      <form noValidate onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <p>Set time needed for work</p>
          <input
            className="input"
            type="number"
            name="work"
            onChange={handleChange}
            value={newTimer.work}
          />
          min
        </div>
        <div className="input-wrapper">
          <p>Set time you will need for break</p>
          <input
            className="input"
            type="number"
            name="shortBreak"
            onChange={handleChange}
            value={newTimer.short}
          />
          min
        </div>
        <button type="submit" className="btn">
          Set Timer
        </button>
      </form>
    </div>
  );
};

export default Set;
