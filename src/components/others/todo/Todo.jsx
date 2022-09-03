import React,{useState} from 'react';
import './todo.css';
import { AiFillEdit,AiFillCloseCircle} from 'react-icons/ai'

const Todo = () => {

    const [inputText, setInputText] = useState('');
    const [todos,setTodos] = useState(['To-do']);
    const [editing, setEditing] = useState(false);
    const [todoIndex, setTodoIndex] = useState(0);

    const createTodo = (e) =>{
        if(inputText&&e.key ==='Enter'&&!editing) {
           const newTodo = inputText;
           setTodos(prev=>[...prev, newTodo])
            setInputText('');
        } else if(!inputText&&e.key ==='Enter'&&!editing) {
            alert('Empty value!');
        } else if(inputText&&e.key ==='Enter'&&editing) {
            const todoArray = document.querySelectorAll('.todo-div');
            console.log(todoArray[todoIndex].firstChild);
            console.log(inputText);
        //     todoArray[todoIndex].innerHTML = `<div key={Math.random()*1000000} className='todo-div'>${inputText} 
        //     <div className='todo-btn todo-set'><AiFillEdit onClick={()=>editTodo(todo)}/></div>
        //     <div className='todo-btn todo-del'><AiFillCloseCircle onClick={()=>deleteTodo(todo)}/></div>
        // </div>`
        
            
            setEditing(false);
            setInputText('');
        }
    }

    const editTodo = (that) => {
        setEditing(true);
        setInputText(that);
        setTodoIndex(todos.indexOf(that));
    }

    const deleteTodo = (id) => {
        const filtered = todos.filter(t=>t!==id);
        setTodos(filtered);
        // if(window.confirm('Do you want delete this note?')) {} 
    }

  return (
    <>
    <div className='todo-body'>
        <input className='todo-input' type='text' placeholder='Add your todo..' value={inputText} onChange={(e)=>setInputText(e.target.value)} onKeyPress={createTodo}/>
        <section className='todo-section'>
            {todos.map(todo=>{
                return(
                    <div key={Math.random()*1000000} className='todo-div'>{todo} 
                        <div className='todo-btn todo-set'><AiFillEdit onClick={()=>editTodo(todo)}/></div>
                        <div className='todo-btn todo-del'><AiFillCloseCircle onClick={()=>deleteTodo(todo)}/></div>
                    </div>
                )
            })}
        </section>
    </div>
    </>
  )
}

export default Todo;