import { createStore } from "redux";

//action
const ADD = "ADD";
const DELETE = "DELETE";

//action creators
const addToDo = text => {
  return {
    type: ADD,
    text
  };
};

const deleteToDo = id => ({ type: DELETE, id });

//reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      const newToDo = [{ text: action.text, id: Date.now() }, ...state];
      return newToDo;
    case DELETE:
      const cleaned = state.filter(toDo => toDo.id !== action.id);
      return cleaned;
    default:
      return state;
  }
};

//store
const store = createStore(reducer);

//export actionCreators
export const actionCreators = {
  addToDo,
  deleteToDo
};

export default store;
