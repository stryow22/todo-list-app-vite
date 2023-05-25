import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: string;
}

interface TodoState {
  todos: Todo[];
  categoryFilter: string;
}

export const setCategoryFilter = createAction<string>("todo/setCategoryFilter");

const initialState: TodoState = {
  todos: [],
  categoryFilter: "All",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
        category: "Default",
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCategoryFilter, (state, action) => {
      state.categoryFilter = action.payload;
    });
  },
});

export const { addTodo, toggleTodo, editTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
