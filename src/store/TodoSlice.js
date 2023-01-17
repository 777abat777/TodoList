import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
   'todos/fetchTodos',
   async (_, { rejectWithValue }) => {
      try {
         const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
         if (!response.ok) {
            throw new Error("Server error")
         }
         const data = await response.json()
         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const deleteTodo = createAsyncThunk(
   'todos/deleteTodo',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE'
         })
         console.log(response)
         if (!response.ok) {
            throw new Error("Server error")
         }
         dispatch(removeTusk({ id }))
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const toggleTodo = createAsyncThunk(
   'todos/toggleTodo',
   async (id, { rejectWithValue, dispatch, getState }) => {
      const tusk = getState().todos.todos.find((el) => el.id === id)
      try {
         const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               completed: !tusk.completed
            })
         })
         if (!response.ok) {
            throw new Error("toggle tusk")
         }
         dispatch(checkTusk({ id }))
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const addNewTodo = createAsyncThunk(
   'todos/addNewTodo',
   async (text, { rejectWithValue, dispatch }) => {
      try {
         const todo = {
            title: text,
            id: 1,
            completed: false
         }
         const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
         })
         if (!response.ok) {
            throw new Error("add tusk")
         }
         const data = await response.json()
         dispatch(addTodo(data))

      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

const rejectError = (state, action) => {
   state.status = 'rejected'
   state.error = action.payload
}

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
         state.todos.push(action.payload)
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
      [fetchTodos.rejected]: rejectError,
      [deleteTodo.rejected]: rejectError,
      [toggleTodo.rejected]: rejectError,
      [addNewTodo.rejected]: rejectError,
   }
})

export const { addTodo, removeTusk, checkTusk } = todoSlice.actions
export default todoSlice.reducer