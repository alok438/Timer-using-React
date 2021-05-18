import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //usestate
  todoList: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    saveTodo: (state, action) => {
      state.todoList.push(action.payload); //setState
    },

    setCheck: (state, action) => {
      state.todoList.map((item) => {
        if (action.payload === item.id) {
          if (item.done === true) {
            item.done = false;
          } else {
            item.done = true;
          }
        }
        return item.done;
      });
    },

    deleteAll: (state) => {
      return void (state.todoList = initialState);
    },
  },
});

export const { saveTodo, setCheck, deleteAll } = todoSlice.actions;
export const selectTodoList = (state) => state.todos.todoList;
export default todoSlice.reducer;
