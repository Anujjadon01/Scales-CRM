import { 
  Search, Filter, Plus, 
  TrendingUp
} from "lucide-react";

function Revenue(){
  return (
    <div className="flex bg-[#0b0e11] min-h-screen text-slate-300 font-sans flex-1 ml-64 p-5 h-screen overflow-y-auto">

      <div className="flex-1 p-8">
        
 
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Revenue Overview</h1>
            <p className="text-gray-400">Monitor sales performance, track targets, and analyze revenue streams</p>
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

      </div>
    </div>
  );
}
export default Revenue