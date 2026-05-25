import React, { useState, useEffect } from "react";
import { Sparkles, Plus, Trash2 } from "lucide-react";

function Todo() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!todo.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: todo,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((list) => list.id !== id));
  };

  const filteredTodos = todos.filter((list) => {
    if (filter === "active") {
      return !list.completed;
    }
    if (filter === "completed") {
      return list.completed;
    }
    return true;
  });

  const toggleTodo = (id) => {
    setTodos(
      todos.map((list) =>
        list.id === id ? { ...list, completed: !list.completed } : list,
      ),
    );
  };

  return (
    <section className="min-h-screen flex flex-col items-center px-5 py-10 md:px-10 md:py-10">
      <div className="w-full flex flex-col items-center mb-5 p-5">
        <div className="flex items-center gap-2">
          <h1 className="w-fit text-center font-heading font-extrabold text-3xl md:text-4xl leading-tight">
            Todo App
          </h1>
        </div>
        <p className="font-body leading-relaxed font-semibold text-xl text-gray-400">
          Let's make today productive
        </p>
      </div>

      {/* INPUT FIELD */}

      <div className="w-full flex gap-5 mb-7">
        <div className="h-15 p-5 md:- border flex-2 flex items-center gap-3 rounded-2xl shadow-xl/10">
          <Sparkles />
          <input
            type="text"
            placeholder="What's on your mind?"
            className="outline-0 w-full"
            value={todo}
            onChange={(t) => setTodo(t.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
        </div>
        <button
          onClick={addTodo}
          className="cursor-pointer h-15 border flex-1 text-white bg-black rounded-2xl flex items-center justify-center gap-2 shadow-xl/20"
        >
          <Plus /> Add
        </button>
      </div>

      {/* TODO LIST */}

      <div className="border flex-1 w-full shadow-xl/30 rounded-b-2xl ">
        <div className="h-15 flex justify-between  bg-black text-white">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 cursor-pointer transition hover:duration-700 ${filter === "all" ? "bg-white border-b text-black" : "bg-black text-white"}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`flex-1 cursor-pointer transition hover:duration-700 ${filter === "active" ? "bg-white border-b text-black" : "bg-black text-white"}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`flex-1 cursor-pointer transition hover:duration-700 ${filter === "completed" ? "bg-white border-b text-black" : "bg-black text-white"}`}
          >
            Completed
          </button>
        </div>
        <div className="p-5 flex flex-col overflow-y-auto max-h-[60vh]">
          {filteredTodos.map((list) => (
            <div
              key={list.id}
              className="border p-4 rounded-xl flex justify-between items-center"
            >
              <p className={list.completed ? "line-through text-gray-400" : ""}>
                {list.text}
              </p>
              <input
                type="checkbox"
                checked={list.completed}
                onChange={() => toggleTodo(list.id)}
              />
              <button onClick={() => deleteTodo(list.id)}>
                <Trash2 />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Todo;
