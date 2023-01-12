import { useDispatch } from 'react-redux';
import { addTodo } from './../../store/TodoSlice';
import { useState } from 'react';
import TodoList from './TodoList/TodoList';
import style from './Todo.module.css'



const Todo = () => {
   const [tuskText, setTuskText] = useState('')
   const changeTuskText = (e) => {
      let value = e.currentTarget.value
      setTuskText(value)
   }
   const dispatch = useDispatch()
   const addTusk = () => {
      if (tuskText.length > 0) {
         dispatch(addTodo({ text: tuskText }))
         setTuskText('')
      }
   }

   return (
      <div className={style.todo}>
         <div className={style.todo_add}>
            <input type="text" placeholder="Добавить дело" value={tuskText} onChange={changeTuskText} />
            <button onClick={addTusk}>+</button>
         </div>
         <TodoList />
      </div>
   )
}

export default Todo