import React, { useEffect, useState } from "react";
import ToDo from "./ToDo";
import axios from "axios";
import { base_URL } from "./utils/constand";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios
      .get(`${base_URL}/get`)
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      saveTodo();
    }
  };

  const saveTodo = () => {
    axios
      .post(`${base_URL}/save`, { todo: inputValue })
      .then((res) => {
        return axios.get(`${base_URL}/get`);
      })
      .then((res) => {
        setTodos(res.data);
        setInputValue("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">ToDo App</h1>
        <form
          className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
          onSubmit={handleAddTodo}
        >
          <div className="flex flex-col mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="todo"
            >
              ToDo
            </label>
            <div className="flex">
              <input
                className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="todo"
                type="text"
                placeholder="Enter your todo"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
              >
                Add
              </button>
            </div>
          </div>
        </form>
        <div className="w-full max-w-md">
          <ToDo todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </>
  );
}

export default App;
