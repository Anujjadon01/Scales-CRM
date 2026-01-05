import { Search, Filter, Plus, Calendar, AlertTriangle, CheckCircle, Clock, X } from "lucide-react";
import { useEffect, useState } from "react";

function Tasks() {
  const [description, setDescription] = useState("");
  const [relatedTo, setRelatedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [owner, setOwner] = useState("");
  const [ownerPhoto, setOwnerPhoto] = useState(null);
  const [data1, setData1] = useState([]);
  const [conBox, setConBox] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("relatedTo", relatedTo);
      formData.append("dueDate", dueDate);
      formData.append("priority", priority);
      formData.append("owner", owner);
      if (ownerPhoto) formData.append("ownerPhoto", ownerPhoto);

      const response = await fetch("http://localhost:3000/api/user/tasksmanagementAPI", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        fetchtaskdata();
        resetForm();
        setConBox(false);
      }
    } catch (error) {
      console.log("Network error.");
    }
  };

  const resetForm = () => {
    setDescription(""); setRelatedTo(""); setDueDate(""); setPriority("Medium"); setOwner(""); setOwnerPhoto(null);
  };

  const fetchtaskdata = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/fetchtasksmanagement");
      const data = await response.json();
      setData1(data.taskfulldata || []); 
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => { fetchtaskdata(); }, []);

  const openBox = () => setConBox(true);
  const closeBox = () => setConBox(false);

  return (
    <div className="flex bg-[#0b0e11] min-h-screen text-slate-300 font-sans flex-1 ml-64 p-5 h-screen overflow-y-auto">
      <div className="flex-1 p-8">
        
        {/* Header with Stats (Numbers in the corner) */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Tasks Management</h1>
            <p className="text-gray-400">Track your activities and reminders.</p>
          </div>
          
          <div className="flex gap-6">
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase">Pending</p>
              <div className="bg-gray-800 px-3 py-1 rounded-lg inline-block mt-1">
                <span className="text-white font-bold">{data1.length}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase">Completed</p>
              <div className="bg-blue-900/30 px-3 py-1 rounded-lg inline-block mt-1">
                <span className="text-blue-400 font-bold">8</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase">Overdue</p>
              <div className="bg-red-900/30 px-3 py-1 rounded-lg inline-block mt-1">
                <span className="text-red-400 font-bold">3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Main Action */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <button onClick={openBox} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
            <Plus size={18} /> Add New Task
          </button>
        </div>

        {/* Filter Buttons (Design Only) */}
        <div className="flex gap-2 mb-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            All Tasks
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
            <AlertTriangle size={14} className="text-red-400" /> High Priority
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
            <Calendar size={14} className="text-blue-400" /> Due Today
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
            <Clock size={14} className="text-purple-400" /> Upcoming
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
            <CheckCircle size={14} className="text-green-400" /> Completed
          </button>
        </div>

        {/* Table Mapping */}
        <div className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase">
              <tr>
                <th className="p-4 border-b border-gray-800">Description</th>
                <th className="p-4 border-b border-gray-800">Related To</th>
                <th className="p-4 border-b border-gray-800">Due Date</th>
                <th className="p-4 border-b border-gray-800">Priority</th>
                <th className="p-4 border-b border-gray-800">Owner</th>
              </tr>
            </thead>
            <tbody>
              {data1.length > 0 ? (
                data1.map((item, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/20 transition-colors">
                    <td className="p-4 text-white font-medium">{item.description}</td>
                    <td className="p-4 text-gray-400">{item.relatedTo}</td>
                    <td className="p-4 text-sm">
                      {item.dueDate ? new Date(item.dueDate).toLocaleDateString('en-GB') : "---"}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        item.priority === 'High' ? 'bg-red-900/30 text-red-400' : 
                        item.priority === 'Medium' ? 'bg-yellow-900/30 text-yellow-400' : 
                        'bg-blue-900/30 text-blue-400'
                      }`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {item.ownerPhoto && (
                          <img 
                            src={`http://localhost:3000/${item.ownerPhoto.replace(/\\/g, '/')}`} 
                            className="w-7 h-7 rounded-full object-cover border border-gray-700" 
                            alt="owner"
                          />
                        )}
                        <span className="text-sm">{item.owner}</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-gray-500">No data found in database.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Form */}
        {conBox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="bg-[#161b22] p-8 rounded-xl w-[500px] border border-gray-800 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Add New Task</h2>
                    <X className="cursor-pointer text-gray-400 hover:text-white" onClick={closeBox} />
                </div>
                <div className="space-y-4">
                    <input type="text" placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 outline-none focus:border-blue-500 text-white" required />
                    <input type="text" placeholder="Related To" value={relatedTo} onChange={(e) => setRelatedTo(e.target.value)} className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 outline-none focus:border-blue-500 text-white" required />
                    <div className="flex gap-4">
                        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="flex-1 p-3 bg-gray-800 rounded-lg border border-gray-700 outline-none text-white" required />
                        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="flex-1 p-3 bg-gray-800 rounded-lg border border-gray-700 outline-none text-white">
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="flex gap-4 items-center">
                        <input type="text" placeholder="Owner" value={owner} onChange={(e) => setOwner(e.target.value)} className="flex-1 p-3 bg-gray-800 rounded-lg border border-gray-700 outline-none text-white" required />
                        <input type="file" onChange={(e) => setOwnerPhoto(e.target.files[0])} className="text-xs text-gray-400 flex-1" />
                    </div>
                </div>
                <div className="flex gap-4 mt-8">
                    <button type="button" onClick={closeBox} className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold">Cancel</button>
                    <button type="submit" className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-white">Save Task</button>
                </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;