import { 
  LayoutDashboard, Users, Layers, DollarSign, CheckCircle, 
  Settings, Search, Filter, Plus 
} from "lucide-react";

function Settings(){
    return (
    <div className="flex bg-[#0b0e11] min-h-screen text-slate-300 font-sans flex bg-[#0b0e11] min-h-screen text-slate-300 font-sans flex-1 ml-64 p-5 h-screen overflow-y-auto">
      
      <div className="flex-1 p-8">

        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Contact Database</h1>
            <p className="text-gray-400">Manage your leads and track sales progress.</p>
          </div>
          <div className="flex gap-10">
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase">Total Leads</p>
              <p className="text-2xl font-bold text-white">1,248</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase">This Month</p>
              <p className="text-2xl font-bold text-blue-500">+124</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email, or company..." 
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium border border-gray-700">
            <Filter size={16} /> Filters
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
            <Plus size={18} /> Add New Lead
          </button>
        </div>

        <div className="flex gap-2">
          <button className="px-5 py-1.5 bg-white text-black rounded-full text-sm font-bold">
            All Leads
          </button>
          <button className="px-5 py-1.5 bg-gray-800/50 text-gray-300 rounded-full text-sm flex items-center gap-2 border border-gray-700">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> New
          </button>
          <button className="px-5 py-1.5 bg-gray-800/50 text-gray-300 rounded-full text-sm flex items-center gap-2 border border-gray-700">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Contacted
          </button>
          <button className="px-5 py-1.5 bg-gray-800/50 text-gray-300 rounded-full text-sm flex items-center gap-2 border border-gray-700">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Qualified
          </button>
          <button className="px-5 py-1.5 bg-gray-800/50 text-gray-300 rounded-full text-sm flex items-center gap-2 border border-gray-700">
            <span className="w-2 h-2 rounded-full bg-red-400"></span> Unresponsive
          </button>
        </div>

      </div>
    </div>
  );
}
export default Settings