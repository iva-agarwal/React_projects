"use client";
import { useState } from "react";
import { Check } from "lucide-react";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const toggleComplete = (index) => {
    setTodoList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="flex w-full h-screen justify-center items-center bg-[#FEE1B7] capriola">
      <div className="w-3/4 xl:w-1/2 border-4 border-[#553928] m-auto rounded-2xl overflow-hidden h-3/4">
        <div>
          <div className="bg-[#FEB45C] p-4 flex flex-start gap-3">
            <div className="h-6 w-6 rounded-full bg-[#F26B46]  border-3 border-[#553928]"></div>
            <div className="h-6 w-6 rounded-full bg-[#FECD7F]  border-3 border-[#553928]"></div>
            <div className="h-6 w-6 rounded-full bg-[#7DAD7C]  border-3 border-[#553928]"></div>
          </div>
          <div className="bg-[#FEEECD] flex justify-center flex-col items-center">
            <div className="text-5xl font-extrabold text-[#EF6641] p-4 text-center ">
              {" "}
              TO-DO LIST
            </div>
            <div className="flex flex-row justify-center items-center gap-4 w-full p-4">
              <input
                type="text"
                className="border-4 border-[#553928] text-[#553928] text-lg w-3/5 rounded-full p-4"
                placeholder="Enter task"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && todo.trim() !== "") {
                    setTodoList([...todoList, { text: todo, completed: false }]);
                    setTodo("");
                  }
                }}
              />
            <button
  className="bg-[#FCAF93] border-4 border-[#553928] text-[#553928]  text-sm md:text-lg px-6 py-4 md:px-12 rounded-full font-bold cursor-pointer transition-all duration-200  hover:bg-[#FEB45C]"
  onClick={() => {
    if (todo.trim() === "") return;
    setTodoList([...todoList, { text: todo, completed: false }]);
    setTodo("");
  }}
>
  + Add Task
</button>

            </div>
          </div>
          <div className="p-4 bg-[#FEEECD] text-[#553928] h-[46vh]">
  <div className="bg-[#FFE8C1] text-2xl font-bold border-4 border-[#553928] rounded-2xl p-4 h-full overflow-y-auto">
    <ul >

                {todoList.map((item, index) => (
                  <li key={index}>
                    <div className="flex flex-row items-center gap-4 p-2">
                      <div
                        className={`border-3 border-[#553928] flex items-center justify-center rounded-full w-8 h-8 cursor-pointer transition-all duration-200 ${
                          item.completed ? "bg-[#FEB45C]" : ""
                        }`}
                        onClick={() => toggleComplete(index)}
                      >  {item.completed && <Check className="w-5 h-5 text-[#553928]" strokeWidth={4}/>}</div>
                      <div
                        className={`w-full border-b-4 border-dashed p-2 transition-all duration-300 ${
                          item.completed ? "line-through opacity-50" : ""
                        }`}
                      >
                        {item.text}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
