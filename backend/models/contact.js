const mongoose = require('mongoose');

// Define the schema for a contact
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  company: { type: String, required: true },
  jobTitle: { type: String, required: true },
});

module.exports = mongoose.model('Contact', contactSchema);
