import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
   'todos/fetchTodos',
   async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      console.log(response)
      const data = await response.json()
      return data
   }
)


const todoSlice = createSlice({
   name: 'todos',
   initialState: {
      todos: [
         { id: 1, title: 'firstDeal', completed: true },
      ],
      status: null,
      error: null
   },
   reducers: {
      addTodo(state, action) {
         state.todos.push({
            id: new Date().toISOString(),
            title: action.payload.text,
            completed: false
         })
      },
      removeTusk(state, action) {
         state.todos = state.todos.filter((el) => el.id !== action.payload.id)
      },
      checkTusk(state, action) {
         state.todos.map((el) => {
            if (el.id !== action.payload.id) {
               return el
            }
            return el.completed = !el.completed
         })

      }
   },
   extraReducers: {
      [fetchTodos.pending]: (state, action) => {
         state.status = 'loading'
         state.error = null
      },
      [fetchTodos.fulfilled]: (state, action) => {
         state.status = 'resolved'
         state.todos = action.payload

      },
      [fetchTodos.rejected]: (state, action) => { }
   }
})

export const { addTodo, removeTusk, checkTusk } = todoSlice.actions
export default todoSlice.reducer