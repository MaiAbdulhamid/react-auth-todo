import { useRef } from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../store";

function Todo({ todo }) {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const deleteTodoHandler = (id) => {
    dispatch(todoActions.removeTodo(id));
  };

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };
  const update = () => {
    dispatch(
      todoActions.updateTodo({
        id: todo.id,
        task: inputRef.current.value,
      })
    );
    inputRef.current.disabled = true;
  };

  return (
    <li className="p-3 m-3 border-none flex justify-between	">
      <input
        ref={inputRef}
        type="text"
        name="task"
        defaultValue={todo.task}
        disabled={inputRef}
        onMouseLeave={() => update()}
      />
      <div className="flex gap-0.5">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold p-1 rounded border-none mt-2 mb-2" onClick={changeFocus}>Edit</button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold p-1 rounded border-none mt-2 mb-2" onClick={() => deleteTodoHandler(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default Todo;
