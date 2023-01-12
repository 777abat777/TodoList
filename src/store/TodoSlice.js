import { createSlice } from "@reduxjs/toolkit";
const todoSlice = createSlice({
   name: 'todos',
   initialState: {
      todos: [
         { id: 1, text: 'firstDeal', completed: true },
      ]
   },
   reducers: {
      addTodo(state, action) {
         state.todos.push({
            id: new Date().toISOString(),
            text: action.payload.text,
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
   }
})

export const { addTodo, removeTusk, checkTusk } = todoSlice.actions
export default todoSlice.reducer