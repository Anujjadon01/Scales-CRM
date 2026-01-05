import mongoose, { Schema } from "mongoose";

const OpportunitySchema = new Schema({
    opportunityName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    dealValue: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: String,
        required: true,
    },
    leadSource: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    stage: {
        type: String,
        required: true,
    }
});

const OpportunityModel = mongoose.model("opportunity", OpportunitySchema);
export default OpportunityModel;
