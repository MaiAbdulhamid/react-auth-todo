import { createSlice, current } from "@reduxjs/toolkit";

// create slice

const name = "todos";
const initialState = createInitialState();
const reducers = {
  addTodo: (state, action) => {
    const todo = {
      id: Math.random().toString(),
      task: action.payload,
    };
    state.todos.push(todo);
    const updatedTodos = state.todos;
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  },
  removeTodo: (state, action) => {
    const filteredTodos = state.todos.filter((todo) => todo.id !== action.payload);
    state.todos = filteredTodos;
    const updatedTodos = filteredTodos.map((todo) => todo)
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  },
  updateTodo: (state, action) => {
    const existingTodoIndex = state.todos.findIndex((todo) => todo.id === action.payload.id);
    const existingTodo = state.todos[existingTodoIndex];
 
    const todo = {
      ...existingTodo,
      task: action.payload.task
    }

    state.todos[existingTodoIndex] = todo;
    const newState = [...state.todos]
    const updatedTodos = newState.map((todo) => todo);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  },
};

const slice = createSlice({
  name,
  initialState,
  reducers,
});

// exports
export const todoActions = { ...slice.actions };
export const todosReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    todos:
      localStorage.getItem("todos") !== null
        ? JSON.parse(localStorage.getItem("todos"))
        : [],
  };
}

