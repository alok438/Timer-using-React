import React, { useEffect, useContext } from "react";
import "./App.css";
import Input from "./components/Input";
import TodoItem from "./components/TodoItem";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectTodoList, deleteAll } from "./features/todoSlice";
import Button from "./components/Button";
import Countdown from "./components/Countdown";
import { SettingsContext } from "./context/Settings";
import Set from "./components/Set";
import { Row, Col } from "antd";

function App() {
  const dispatch = useDispatch();
  const todoList = useSelector(selectTodoList);
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
  const handleDelete = () => {
    dispatch(deleteAll());
  };
  return (
    <div className="container">
      <Row>
        <div className="container">
          <Col span={6} pull={18}>
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
                      title="Break"
                      activeClass={
                        executing.active === "short"
                          ? "active-label"
                          : undefined
                      }
                      _callback={() => setCurrentTimer("short")}
                    />
                  </li>
                </ul>
                <center>
                  <Button title="Settings" _callback={SettingsBtn} />
                </center>
                <div className="timer-container">
                  <div className="time-wrapper">
                    <Countdown
                      key={pomodoro}
                      timer={pomodoro}
                      animate={startAnimate}
                    >
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
          </Col>
          <Col span={18} push={6}>
            <div className="App">
              <div className="app__container">
                <div className="app__todoContainer">
                  <Input />

                  {todoList.map((items) => {
                    return (
                      <TodoItem
                        name={items.item}
                        done={items.done}
                        id={items.id}
                      />
                    );
                    //return console.log(items);
                  })}

                  <button onClick={handleDelete}>Delete All</button>
                </div>
              </div>
            </div>
          </Col>
        </div>
      </Row>
    </div>
  );
}

export default App;
