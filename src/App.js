import React, { useEffect, useContext } from "react";
import Button from "./components/Button";
import Countdown from "./components/Countdown";
import { SettingsContext } from "./context/Settings";
import Set from "./components/Set";
const App = () => {
  const {
    pomodoro,
    executing,
    startAnimate,
    children,
    startTimer,
    pauseTimer,
    updateExecute,
    setCurrentTimer,
    SettingsBtn,
  } = useContext(SettingsContext);

  useEffect(() => {
    updateExecute(executing);
  }, [executing, startAnimate]);

  return (
    <div className="container">
      <h1>Counter</h1>
      {pomodoro !== 0 ? (
        <>
          <ul className="labels">
            <li>
              <Button
                title="Work"
                activeClass={
                  executing.active === "work" ? "active-label" : undefined
                }
                _callback={() => setCurrentTimer("work")}
              />
            </li>
            <li>
              <Button
                title="Short Break"
                activeClass={
                  executing.active === "short" ? "active-label" : undefined
                }
                _callback={() => setCurrentTimer("short")}
              />
            </li>
            <li>
              <Button
                title="Long Break"
                activeClass={
                  executing.active === "long" ? "active-label" : undefined
                }
                _callback={() => setCurrentTimer("long")}
              />
            </li>
          </ul>
          <Button title="Settings" _callback={SettingsBtn} />
          <div className="timer-container">
            <div className="time-wrapper">
              <Countdown key={pomodoro} timer={pomodoro} animate={startAnimate}>
                {children}
              </Countdown>
            </div>
          </div>
          <div className="button-wrapper">
            <Button
              title="Start"
              activeClass={!startAnimate ? "active" : undefined}
              _callback={startTimer}
            />
            <Button
              title="Pause"
              activeClass={startAnimate ? "active" : undefined}
              _callback={pauseTimer}
            />
          </div>
        </>
      ) : (
        <Set />
      )}
    </div>
  );
};

export default App;
