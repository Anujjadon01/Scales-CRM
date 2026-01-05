import { useState, useEffect } from "react";
import { Search, Filter, Plus, X } from "lucide-react";
import { DndContext } from "@dnd-kit/core";
import Column from "./Column ";

function Pipeline() {
  const [box, setBox] = useState(false);
  const [data1, setData1] = useState([]);
  const [opportunityName, setOpportunityName] = useState("");
  const [date, setDate] = useState("");
  const [dealValue, setdealValue] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [assignedTo, setassignedTo] = useState("");
  const [leadSource, setleadSource] = useState("");
  const [description, setdescription] = useState("");
  const [stage, setStage] = useState("");

  const fetchOpportunities = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/fetchopportunity");
      if (!response.ok) throw new Error("Failed to fetch opportunities");
      const data = await response.json();
      setData1(data.Oppfulldata || []);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const getOpportunitiesByStage = (stage) => {
    return data1.filter((opp) => opp.stage === stage);
  };

  const pipelineStages = [
    { title: "Qualification", stage: "qualification" },
    { title: "Discovery", stage: "discovery" },
    { title: "Proposal", stage: "proposal" },
    { title: "Negotiation", stage: "negotiation" },
    { title: "Closed", stage: "closed" },
  ];

  const pipelineData = pipelineStages.map((stage) => ({
    title: stage.title,
    id: stage.stage,
    cards: getOpportunitiesByStage(stage.stage).map((opp) => ({
      id: opp._id,
      title: opp.opportunityName,
      company: opp.companyName,
      amount: opp.dealValue,
      date: opp.date,
      status: "New",
      task: "Call decision maker",
    })),
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/user/opportunity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opportunityName, date, dealValue, companyName, assignedTo, leadSource, description, stage }),
      });
      if (!response.ok) throw new Error("Failed to add opportunity");
      fetchOpportunities();
      setBox(false);
      setOpportunityName("");
      setDate("");
      setdealValue("");
      setCompanyName("");
      setassignedTo("");
      setleadSource("");
      setdescription("");
      setStage("");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const cardId = active.id;
    const newStage = over.id;

    try {
      await fetch(`http://localhost:3000/api/user/opportunity/${cardId}/stage`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: newStage }),
      });
      fetchOpportunities();
    } catch (error) {
      console.error("Error updating stage:", error);
    }
  };

  const openBox = () => setBox(true);
  const close = () => setBox(false);

  return (
    <div className="flex bg-[#0b0e11] min-h-screen text-slate-300 font-sans flex-1 ml-64 p-5 h-screen overflow-y-auto">
      <div className="flex-1 p-8">
        <div className="w-255 fixed">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Sales Pipeline</h1>
              <p className="text-gray-400">Track your opportunities and manage deal flow.</p>
            </div>
            <div className="flex gap-10">
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase">Total Value</p>
                <p className="text-2xl font-bold text-white">$1.4M</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase">Open Deals</p>
                <p className="text-2xl font-bold text-blue-500">24</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search deals, companies..."
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium border border-gray-700">
              <Filter size={16} />
              Filters
            </button>
            <button onClick={openBox} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
              <Plus size={18} />
              Add Opportunity
            </button>
          </div>
        </div>

        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] scroll-smooth mt-40">
            {pipelineData.map((column) => (
              <Column
                key={column.id}
                id={column.id}
                title={column.title}
                cards={column.cards}
              />
            ))}
          </div>
        </DndContext>

        {box && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="bg-[#161b22] z-50 p-6 rounded-xl w-[500px] border border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Add Opportunity</h2>
                <button onClick={close} type="button" className="text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <hr className="border-gray-700 mb-4" />
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm text-gray-300 block mb-1">Opportunity Name</label>
                    <input
                      type="text"
                      name="opportunityName"
                      value={opportunityName}
                      onChange={(e) => setOpportunityName(e.target.value)}
                      placeholder="Enter opportunity name"
                      className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-300 block mb-1">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter company name"
                      className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm text-gray-300 block mb-1">Deal Value</label>
                    <input
                      type="text"
                      name="dealValue"
                      value={dealValue}
                      onChange={(e) => setdealValue(e.target.value)}
                      placeholder="$ Enter deal value"
                      className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-300 block mb-1">Close Date</label>
                    <input
                      type="date"
                      name="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm text-gray-300 block mb-1">Stage</label>
                    <select
                      name="stage"
                      value={stage}
                      onChange={(e) => setStage(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                      required
                    >
                      <option value="">Select stage</option>
                      <option value="qualification">Qualification</option>
                      <option value="discovery">Discovery</option>
                      <option value="proposal">Proposal</option>
                      <option value="negotiation">Negotiation</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-300 block mb-1">Lead Source</label>
                    <select
                      name="leadSource"
                      value={leadSource}
                      onChange={(e) => setleadSource(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                      required
                    >
                      <option value="">Select lead source</option>
                      <option value="website">Website</option>
                      <option value="referral">Referral</option>
                      <option value="social">Social Media</option>
                      <option value="email">Email</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm text-gray-300 block mb-1">Assigned To</label>
                    <select
                      name="assignedTo"
                      value={assignedTo}
                      onChange={(e) => setassignedTo(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                      required
                    >
                      <option value="">Select team member</option>
                      <option value="anuj">Anuj Thakur</option>
                      <option value="team1">Team Member 1</option>
                      <option value="team2">Team Member 2</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-300 block mb-1">Description</label>
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    placeholder="Enter description..."
                    rows="3"
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
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
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pipeline;
