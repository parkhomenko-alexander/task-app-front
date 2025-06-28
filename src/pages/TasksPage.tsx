import { useEffect, useState } from "react";
import { TasksService } from "../api/TasksService";
import type { Task } from "../api/TasksService";

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        TasksService.getTasks()
            .then(setTasks)
            .catch(console.error);
    }, []);
    console.log(tasks)

    const handleAddTask = async () => {
        try {
            const newTask = await TasksService.createTask(title, description);
            setTasks((prev) => [newTask, ...prev,]);
            setTitle("");
            setDescription("");
            setShowForm(false);
        } catch (err) {
            console.error(err);
            alert("Failed to create task.");
        }
    };

    const handleToggleState = async (task: Task) => {
        console.log("Old task:", task);

        try {
            const updated = await TasksService.updateTaskState(task.id, );
            console.log("Updated from API:", updated);

            setTasks((prev) =>
                prev.map((t) =>
                    t.id === updated.id
                        ? { ...t, state: updated.state } // критично!
                        : t
                )
            );
        } catch (err) {
            console.error(err);
            alert("Failed to update task state.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-3xl p-8 bg-gray-800 rounded shadow-md text-white">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Your Tasks</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {showForm ? "Close" : "+ Add Task"}
                    </button>
                </div>

                {showForm && (
                    <div className="mb-6 space-y-2">
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700"
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700"
                        />
                        <button
                            onClick={handleAddTask}
                            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
                        >
                            Save Task
                        </button>
                    </div>
                )}

                {tasks.length === 0 ? (
                    <p className="text-gray-400">No tasks available.</p>
                ) : (
                    <ul className="space-y-4">
                        {tasks.map((task) => (
                            <li
                                key={task.id}
                                className="p-4 bg-gray-700 rounded flex flex-col"
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-white">{task.title}</span>
                                    <span
                                        onClick={() => handleToggleState(task)}
                                        className={`text-xs cursor-pointer px-2 py-1 rounded ${task.state === "completed"
                                            ? "bg-green-600 text-white"
                                            : "bg-yellow-500 text-black"
                                            }`}
                                    >
                                        {task.state === "completed" ? "Complete" : "Incomplete"}
                                    </span>
                                </div>
                                <p className="text-gray-300 text-sm">{task.description}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
