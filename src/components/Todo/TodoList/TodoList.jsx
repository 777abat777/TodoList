import { useDispatch, useSelector } from 'react-redux';
import { removeTusk, checkTusk } from './../../../store/TodoSlice';
import style from './TodoList.module.css'

const TodoList = () => {
   const dispatch = useDispatch()
   const todos = useSelector((state) => state.todos.todos)


   const changeComplet = (id) => {
      dispatch(checkTusk({ id }))
   }
   const removeDeal = (id) => {
      dispatch(removeTusk({ id }))
   }
   return (
      <ul className={style.list}>
         {todos.map((el) => <li key={el.id}>
            <input type="checkbox" checked={el.completed} onChange={() => { changeComplet(el.id) }} />
            <span>{el.text}</span>
            <button onClick={() => { removeDeal(el.id) }}>remove</button>
         </li>)}
      </ul>
   )
}

export default TodoList