import React, { useState } from 'react';
import { CiEdit, CiTrash } from "react-icons/ci";
import axios from 'axios';
import { base_URL } from './utils/constand';

function ToDo({ todos, setTodos }) {
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

  const deleteTodo = (id) => {
    axios.delete(`${base_URL}/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const editTodo = (todo) => {
    setIsEditing(todo._id);
    setEditValue(todo.todo);
  };

  const updateTodo = (id) => {
    axios.put(`${base_URL}/update/${id}`, { todo: editValue })
      .then((res) => {
        console.log(res.data);
        setTodos(todos.map(todo => todo._id === id ? { ...todo, todo: editValue } : todo));
        setIsEditing(null);
        setEditValue("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mt-6 w-full max-w-md">
      <ul>
        {todos.map((todoItem) => (
          <li
            key={todoItem._id}
            className="bg-white shadow-md rounded-lg p-4 mb-2 flex justify-between items-center"
          >
            {isEditing === todoItem._id ? (
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              <span>{todoItem.todo}</span>
            )}
            <div>
              {isEditing === todoItem._id ? (
                <button className="mr-2 text-green-500 hover:text-green-700" onClick={() => updateTodo(todoItem._id)}>
                  Save
                </button>
              ) : (
                <button className="mr-2 text-blue-500 hover:text-blue-700" onClick={() => editTodo(todoItem)}>
                  <CiEdit size={20} />
                </button>
              )}
              <button className="text-red-500 hover:text-red-700" onClick={() => deleteTodo(todoItem._id)}>
                <CiTrash size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDo;
