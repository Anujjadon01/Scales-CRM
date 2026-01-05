import mongoose, { Schema } from "mongoose";

const ContactSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
    },
    phoneNum: {
        type: String,
        required: true,
    },
    linkedInURL: {
        type: String,
        required: true,
    },
    initialStatu: {
        type: String,
        required: true,
    }
});

const  ContactModel = mongoose.model("ContactSchema", ContactSchema);
export default ContactModel;
