import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const Todo = props => {
  const [todoName, setTodoName] = useState('');
  // const [todoList, setTodoList] = useState([]);
  // const [submittedToDo, setSubmittedToDo] = useState(null);

  useEffect(() => {
    axios.get('https://react-hooks-468bc.firebaseio.com/todos.json')
      .then(result => {
        const todoData = result.data;
        const todos = [];
        for (const key in todoData) {
          todos.push({ id: key, name: todoData[key].name });
        }
        dispatch({ type: 'SET', payload: todos });
      }).catch(err => {
        console.log(err);
      });
    return () => {
      console.log('CleanUp');
    };
  }, []);

  // useEffect(() => {
  //   if (submittedToDo) {
  //     dispatch({ type: 'ADD', payload: submittedToDo });
  //   }
  // }, [submittedToDo]);

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload);
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []);

  const inputChangeHandler = event => {
    setTodoName(event.target.value);
  }

  const todoAddHandler = () => {
    axios
      .post('https://react-hooks-468bc.firebaseio.com/todos.json', { name: todoName })
      .then(res => {
        setTimeout(() => {
          const todoItem = { id: res.data.name, name: todoName };
          dispatch({type: 'ADD', payload: todoItem});
        }, 3000);
      }).catch(err => {
        console.log(err);
      });
  }

  const todoRemoveHandler = todoId => {
    axios.delete(`https://react-hooks-468bc.firebaseio.com/todos/${todoId}.json`)
      .then(res => {
        dispatch({ type: 'REMOVE', payload: todoId });
      }).catch(err => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoName}
      />
      <button type="button" onClick={todoAddHandler}>Add</button>
      <ul>
        {
          todoList.map(todo => {
            return (
              <li key={todo.id} onClick={todoRemoveHandler.bind(this, todo.id)}>{todo.name}</li>
            )
          })
        }
      </ul>
    </React.Fragment>
  )
}

export default Todo;
