import React, { useEffect, useState } from 'react';
import {
  Search, Filter, Plus, X, Mail,
  Phone
} from "lucide-react";

const Contact = () => {

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [linkedInURL, setLinkedInURL] = useState("");
  const [initialStatu, setInitialStatu] = useState("New");
  const [data, setData] = useState([]);
  const [conBox, setConBox] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/user/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, emailAddress, phoneNum, linkedInURL, initialStatu })
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Contact add successfully!");
        confetchData();
        setFullName("");
        setEmailAddress("");
        setPhoneNum("")
        setLinkedInURL("");
        setInitialStatu("New");
        setConBox(false);
      } else {
        console.log(data.error || "Failed to submit form");
      }
    } catch (error) {
      console.log("Network error. Please try again.");
    }
  };

  const confetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/confetchData")
      const data = await response.json();
      console.log("contact", data)
      setData(data.Confulldata);
    } catch (error) {
      console.error('Error fetching contact:', error);
    }
  }

  useEffect(() => {
    confetchData();
  }, []);

  const openBox = () => {
    setConBox(true)
  }

  const closeBox = () => {
    setConBox(false)
  }


  return (
    <div className="flex bg-[#0b0e11] min-h-screen text-slate-300 font-sans flex-1 ml-64 p-5 h-screen overflow-y-auto">

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
          <button onClick={openBox} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
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


        {conBox && (
          <form onSubmit={handleSubmit}>
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-black/40 backdrop-blur-sm">
              <main className="bg-[#161b22] z-50 p-6 rounded-xl w-[500px] border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-2xl font-bold text-white">Add New Lead</p>
                  <button onClick={closeBox} className="text-white text-2xl">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <hr className="border-gray-700 mb-4" />
                <div className="mt-2">
                  <label className="text-sm font-sans text-gray-300">Name</label>
                  <input
                    type="text"
                    placeholder="Add Task"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full mt-2 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                    required
                  />
                </div>
                <div className="flex gap-4 mt-4">
                  <div className="flex-1">
                    <label className="text-sm text-gray-300">email</label>
                    <input
                      type="email"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full mt-2 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-300">phone</label>
                    <input
                      type="number"
                      value={phoneNum}
                      onChange={(e) => setPhoneNum(e.target.value)}
                      className="w-full mt-2 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4 relative">
                  <label className="text-sm text-gray-300">URL</label>
                  <input
                    type="text"
                    placeholder="Search name"
                    value={linkedInURL}
                    onChange={(e) => setLinkedInURL(e.target.value)}
                    className="w-full mt-2 pl-10 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                  />

                </div>

                <div className="mt-4 relative">
                  <label className="text-sm text-gray-300">Status </label>
                  <select
                    value={initialStatu}
                    onChange={(e) => setInitialStatu(e.target.value)}
                    className="w-full mt-2 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Unresponsive">Unresponsive</option>
                  </select>

                </div>
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    type="button"
                    onClick={closeBox}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold"
                  >
                    Save Lead
                  </button>
                </div>
              </main>
            </div>
          </form>
        )}

        <div className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 mt-6">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="p-3 text-left text-xs uppercase text-gray-400">
                  <input type="checkbox" />
                </th>
                <th className="p-3 text-left text-xs uppercase text-gray-400">Name</th>
                <th className="p-3 text-left text-xs uppercase text-gray-400">Contact Info</th>
                <th className="p-3 text-left text-xs uppercase text-gray-400">Lead Status</th>
                <th className="p-3 text-left text-xs uppercase text-gray-400">LinkedIn</th>
                <th className="p-3 text-left text-xs uppercase text-gray-400">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {data.map((lead) => (
                <tr key={lead._id} className="border-t border-gray-700 hover:bg-gray-700/30">
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                  <td className="p-3 text-white">
                    {lead.fullName}
                    {/* <div className="text-xs text-gray-400">Tech Solutions Inc.</div> */}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400 text-xs">
                        <Mail className="w-3 h-3" />
                      </span>
                      <span className="text-gray-400 text-sm">{lead.emailAddress}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400 text-xs">
                        <Phone className="w-3 h-3" />
                      </span>
                      <span className="text-gray-400 text-sm">{lead.phoneNum}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${lead.initialStatu === "Qualified"
                        ? "bg-green-500/20 text-green-400"
                        : lead.initialStatu === "Contacted"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : lead.initialStatu === "Unresponsive"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                    >
                      {lead.initialStatu}
                    </span>
                  </td>
                  <td className="p-3">
                    <a
                      href={lead.linkedInURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 text-sm"
                    >
                      LinkedIn
                    </a>
                  </td>
                  <td className="p-3 text-sm text-gray-400">2 hours ago</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>



      </div>
    </div>
  );
};
export default Contact