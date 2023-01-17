import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, toggleTodo } from './../../../store/TodoSlice';
import style from './TodoList.module.css'

const TodoList = () => {
   const dispatch = useDispatch()
   const { todos, error, status } = useSelector((state) => state.todos)


   const changeComplet = (id) => {
      dispatch(toggleTodo(id))
   }
   const removeDeal = (id) => {
      dispatch(deleteTodo(id))
   }
   return (

      <ul className={style.list}>
         {status === 'loading' && <h1>Loading data...</h1>}
         {error && <h1>Server error {error}</h1>}
         {todos.map((el) => <li key={el.id}>
            <input type="checkbox" checked={el.completed} onChange={() => { changeComplet(el.id) }} />
            <span>{el.title}</span>
            <button onClick={() => { removeDeal(el.id) }}>remove</button>
         </li>)}
      </ul>
   )
}

export default TodoList