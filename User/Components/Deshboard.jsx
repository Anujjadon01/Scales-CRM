import {  Pencil, Search, X, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";

function Deshboard() {
    const [box, setBox] = useState(false);
    const [taskDis, setTaskDis] = useState("");
    const [duedate, setDate] = useState("");
    const [priority, setPriority] = useState("medium");
    const [company, setCompany] = useState("");
    const [data1, setData1] = useState([])
    const [editBox, setEditBox] = useState(false)
    const [editTaskId, setEditTaskId] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/task", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ taskDis, duedate, priority, company }),
        });
        const data = await response.json();

        if (response.ok) {
            console.log("Task added successfully!");
            fetchdata();
            setBox(false);
            setTaskDis("");
            setDate("");
            setPriority("medium");
            setCompany("");
        } else {
            console.log(data.error, "Task failed");
        }
    };

    const fetchdata = async () => {
        try {
            const response = await fetch("http://localhost:3000/fetchTask")
            const data = await response.json();
            console.log("dhfjdhfddddddddddd", data)
            setData1(data.fulldata);
        } catch (error) {
            console.error('Error fetching task:', error);
        }

    };

    const Changetask = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/changeput/${editTaskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ taskDis, duedate, priority, company }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Task Updeted successfully!");
                fetchdata();
            } else {
                console.log(data.error, "Task updated failed");
            }

        } catch (error) {
            console.error("Error updating task:", error);
        }

    }


    useEffect(() => {
        fetchdata();
    }, []);

    const openEditBox = (e) => {
        setEditTaskId(e._id)
        setTaskDis(e.taskDis);
        setDate(e.duedate.split('T')[0]);
        setPriority(e.priority);
        setCompany(e.company);
        setEditBox(true);
    }

    const closeEditBox = () => {
        setEditBox(false)
    }

    const opnBox = () => {
        setBox(true);
    };

    const close = () => {
        setBox(false);
    };

    return (
        <div className="flex bg-[#0b0e11] min-h-screen text-slate-300 font-sans flex-1 ml-64 p-5 h-screen overflow-y-auto">

            <div className="flex-1 p-10 ">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">Main Dashboard</h1>
                        <p className="text-gray-400">Welcome back, Alex. Here's your day at a glance.</p>
                    </div>
                    <button onClick={opnBox} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                        <span>+</span> Add Quick Task
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-6 mb-10">

                    <div className="bg-[#161b22] border border-gray-800 p-6 rounded-xl">
                        <div className="flex justify-between mb-4">
                            <p className="text-gray-400 text-sm">Active Deals Value</p>
                            <span className="bg-green-500/10 text-green-500 p-1 rounded px-2">$</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-white">$142,500</h3>
                            <span className="text-green-400 text-sm font-bold"><TrendingUp className="w-4 h-4 inline" /> 12%</span>
                        </div>
                        <p className="text-gray-500 text-xs mt-1">vs. last month</p>
                    </div>
                    <div className="bg-[#161b22] border border-gray-800 p-6 rounded-xl">
                        <div className="flex justify-between mb-4">
                            <p className="text-gray-400 text-sm">Meetings This Week</p>
                            <span className="bg-blue-500/10 text-blue-500 p-1 rounded px-2">📅</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-white">18</h3>
                            <span className="text-gray-500 text-sm ml-1">scheduled</span>
                        </div>
                        <p className="text-gray-500 text-xs mt-1">4 remaining today</p>
                    </div>
                    <div className="bg-[#161b22] border border-gray-800 p-6 rounded-xl">
                        <div className="flex justify-between mb-4">
                            <p className="text-gray-400 text-sm">Monthly Goal Progress</p>
                            <span className="bg-purple-500/10 text-purple-500 p-1 rounded px-2">🎯</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-white">78%</h3>
                            <span className="text-gray-500 text-sm ml-1">achieved</span>
                        </div>
                        <div className="mt-4 w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-purple-500 h-full w-[78%]"></div>
                        </div>
                    </div>
                </div>

                <div className="flex-1">

                    <div className="bg-[#161b22] border border-gray-800 p-6 rounded-xl mt-6">
                        <h2 className="text-xl font-bold text-white mb-4">Action Center</h2>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">Tasks Due Today</h3>
                            <span className="text-gray-400 text-sm">{data1.length} Pending</span>
                        </div>

                        <div className="space-y-2">
                            {data1.length > 0 ? (
                                data1.map((task) => (
                                    <div
                                        key={task._id}
                                        className="bg-gray-800 p-3 rounded-lg border border-gray-700"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-white font-medium">{task.taskDis}</h4>
                                                <p className="text-gray-400 text-sm">
                                                    {new Date(task.duedate).toLocaleDateString()} • {task.company}
                                                </p>

                                            </div>
                                            <div className="flex items-center gap-2">

                                                <span className={`text-xs px-2 py-1 rounded-full ${task.priority === "high" ? "bg-red-500/20 text-red-400" :
                                                    task.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                                                        "bg-blue-500/20 text-blue-400"
                                                    }`}>
                                                    {task.priority}
                                                </span>
                                                <button onClick={()=> openEditBox(task)} className="p-1 text-gray-400 hover:text-white">
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-center py-4">No tasks found.</p>
                            )}
                        </div>
                    </div>
                </div>

            </div>

                {box && (
                    <form onSubmit={handleSubmit}>
                        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-black/40 backdrop-blur-sm">
                            <main className="bg-[#161b22] z-50 p-6 rounded-xl w-[500px] border border-gray-800">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-2xl font-bold text-white">Add Task</p>
                                    <button onClick={close} className="text-white text-2xl">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <hr className="border-gray-700 mb-4" />
                                <div className="mt-2">
                                    <label className="text-sm font-sans text-gray-300">TASK DESCRIPTION</label>
                                    <input
                                        type="text"
                                        placeholder="Add Task"
                                        value={taskDis}
                                        onChange={(e) => setTaskDis(e.target.value)}
                                        className="w-full mt-2 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                                        required
                                    />
                                </div>
                                <div className="flex gap-4 mt-4">
                                    <div className="flex-1">
                                        <label className="text-sm text-gray-300">DUE DATE</label>
                                        <input
                                            type="date"
                                            value={duedate}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full mt-2 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-sm text-gray-300">PRIORITY</label>
                                        <select
                                            value={priority}
                                            onChange={(e) => setPriority(e.target.value)}
                                            className="w-full mt-2 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                                        >
                                            <option value="medium">Medium Priority</option>
                                            <option value="high">High Priority</option>
                                            <option value="low">Low</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-4 relative">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm text-gray-300">LINK CONTACT/DEAL</label>
                                        <span className="text-xs text-gray-400">Optional</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search name"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        className="w-full mt-2 pl-10 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                                    />
                                    <Search className="absolute left-3 top-10 text-gray-400 w-4 h-4" />
                                </div>
                                <div className="flex justify-center gap-4 mt-6">
                                    <button
                                        type="button"
                                        onClick={close}
                                        className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-bold"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold"
                                    >
                                        + Add Task
                                    </button>
                                </div>
                            </main>
                        </div>
                    </form>
                )}


            {editBox && (
                <form onSubmit={Changetask}>
                    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-black/40 backdrop-blur-sm">
                        <main className="bg-[#161b22] z-50 p-6 rounded-xl w-[500px] border border-gray-800">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-2xl font-bold text-white">Edit Task</p>
                                <button onClick={closeEditBox} className="text-white text-2xl">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <hr className="border-gray-700 mb-4" />
                            <div className="mt-2">
                                <label className="text-sm font-sans text-gray-300">TASK DESCRIPTION</label>
                                <input
                                    type="text"
                                    placeholder="Edit Task"
                                    value={taskDis}
                                    onChange={(e) => setTaskDis(e.target.value)}
                                    className="w-full mt-2 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                                    required
                                />
                            </div>
                            <div className="flex gap-4 mt-4">
                                <div className="flex-1">
                                    <label className="text-sm text-gray-300">DUE DATE</label>
                                    <input
                                        type="date"
                                        value={duedate}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full mt-2 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm text-gray-300">PRIORITY</label>
                                    <select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="w-full mt-2 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                                    >
                                        <option value="medium">Medium Priority</option>
                                        <option value="high">High Priority</option>
                                        <option value="low">Low</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4 relative">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm text-gray-300">LINK CONTACT/DEAL</label>
                                    <span className="text-xs text-gray-400">Optional</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Edit Company"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="w-full mt-2 pl-10 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                                />
                                <Search className="absolute left-3 top-10 text-gray-400 w-4 h-4" />
                            </div>
                            <div className="flex justify-center gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={closeEditBox}
                                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-bold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold"
                                >
                                    Update Task
                                </button>
                            </div>
                        </main>
                    </div>
                </form>
            )}




        </div>
    );
}

export default Deshboard;
