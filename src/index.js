import { createStore } from "redux";
const input = document.querySelector("input");
const form = document.querySelector("form");
const ul = document.querySelector("ul");

// actions
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// actionCreators;
const addTodo = text => ({ type: ADD_TODO, text });
const deleteTodo = id => ({ type: DELETE_TODO, id });

//reducer
const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      const newTodoObj = { text: action.text, id: Date.now() };
      return [newTodoObj, ...state];
    case DELETE_TODO:
      const cleanedArr = state.filter(todo => todo.id !== action.id);
      return cleanedArr;
    default:
      return state;
  }
};

// store
const store = createStore(reducer);

// subscribe()
store.subscribe(() => console.log(store.getState()));

// dispatch
const dispatchAddTodo = text => {
  store.dispatch(addTodo(text));
};

const dispatchDeleteTodo = e => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteTodo(id));
};

const paintTodos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(todo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DELETE";
    btn.addEventListener("click", dispatchDeleteTodo);
    li.id = todo.id;
    li.innerText = todo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

// subscribe()
store.subscribe(paintTodos);

const onSubmit = e => {
  e.preventDefault();
  const todo = input.value;
  input.value = "";
  dispatchAddTodo(todo);
};

form.addEventListener("submit", onSubmit);
