import ContactModel from "../ContactsSchema.js";
import OpportunityModel from "../OpportunitySchema.js";
import tasksmanagementModel from "../tasksmanagement.js";

const contact = async (req, res) => {
    const { fullName, emailAddress, phoneNum, linkedInURL, initialStatu } = req.body;

    try {
        if (!fullName || !emailAddress || !phoneNum || !linkedInURL || !initialStatu) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        await ContactModel.create({ fullName, emailAddress, phoneNum, linkedInURL, initialStatu })

        res.status(201).json({
            message: "Contact saved successfully"
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const ConFetchData = async(req, res)=>{
    try {
        const Confulldata = await ContactModel.find();
        res.json({Confulldata})
    } catch (error) {
         res.status(500).json({ error: error.message });
    }
}

const  opportunity = async (req, res) => {
    const { opportunityName, date, dealValue, companyName, assignedTo, leadSource, description, stage } = req.body;

    try {
        if (!opportunityName || !date || !dealValue || !companyName || !assignedTo || !leadSource || !description|| !stage) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        await OpportunityModel.create({opportunityName, date, dealValue, companyName, assignedTo, leadSource, description, stage })

        res.status(201).json({
            message: " Opportunity saved successfully"
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const fetchOpportunity = async(req, res) =>{
    try {
        const Oppfulldata = await OpportunityModel.find();
        res.json({Oppfulldata})
    } catch (error) {
         res.status(500).json({ error: error.message });
    }
}


const updateOpportunityStage = async (req, res) => {
  const { id } = req.params;
  const { stage } = req.body;

  try {
    const updatedOpportunity = await OpportunityModel.findByIdAndUpdate(
      id,
      { stage },
      { new: true }
    );

    if (!updatedOpportunity) {
      return res.status(404).json({ error: "Opportunity not found" });
    }

    res.status(200).json(updatedOpportunity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const tasksmanagementAPI = async (req, res) => {
    // 1. Data extract karein
    const { description, relatedTo, dueDate, priority, owner } = req.body;
    const ownerPhoto = req.file ? req.file.path : null;

    try {
        // 2. Validation (Iske andar return hona chahiye)
        if (!description || !relatedTo || !dueDate || !priority || !owner) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        // 3. Database mein save karein
        const newTask = await tasksmanagementModel.create({ 
            description, 
            relatedTo, 
            dueDate, 
            priority, 
            owner, 
            ownerPhoto 
        });

        // 4. Success response
        return res.status(201).json({
            message: "Task saved successfully",
            task: newTask
        });

    } catch (error) {
        console.error("Backend Error Details:", error);
        return res.status(500).json({ error: error.message });
    }
}; 

const fetchtasksmanagement = async (req, res) => {
    try {
        // Sahi model use karein: tasksmanagementModel
        const taskfulldata = await tasksmanagementModel.find().sort({ createdAt: -1 });
        res.json({ taskfulldata });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { contact, ConFetchData, opportunity, fetchOpportunity, updateOpportunityStage, tasksmanagementAPI, fetchtasksmanagement }

