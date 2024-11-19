// const Contact = require('../models/contact');

// // Get all contacts with pagination and sorting
// const getContacts = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, sortBy = 'firstName', order = 'asc' } = req.query;

//     const skip = (page - 1) * limit;
//     const sortOrder = order === 'asc' ? 1 : -1;

//     const contacts = await Contact.find()
//       .skip(skip)
//       .limit(parseInt(limit))
//       .sort({ [sortBy]: sortOrder });

//     const totalContacts = await Contact.countDocuments();
//     res.status(200).json({
//       contacts,
//       totalContacts,
//       totalPages: Math.ceil(totalContacts / limit),
//       currentPage: parseInt(page),
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching contacts', error: err });
//   }
// };

// // Create a new contact
// const createContact = async (req, res) => {
//   const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

//   try {
//     const newContact = new Contact({ firstName, lastName, email, phoneNumber, company, jobTitle });
//     await newContact.save();
//     res.status(201).json(newContact);
//   } catch (err) {
//     res.status(400).json({ message: 'Error creating contact', error: err });
//   }
// };

// // Update a contact
// const updateContact = async (req, res) => {
//   const { id } = req.params;
//   const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

//   try {
//     const updatedContact = await Contact.findByIdAndUpdate(id, { firstName, lastName, email, phoneNumber, company, jobTitle }, { new: true });
//     res.status(200).json(updatedContact);
//   } catch (err) {
//     res.status(400).json({ message: 'Error updating contact', error: err });
//   }
// };

// // Delete a contact
// const deleteContact = async (req, res) => {
//   const { id } = req.params;

//   try {
//     await Contact.findByIdAndDelete(id);
//     res.status(200).json({ message: 'Contact deleted' });
//   } catch (err) {
//     res.status(400).json({ message: 'Error deleting contact', error: err });
//   }
// };

// module.exports = {
//   getContacts,
//   createContact,
//   updateContact,
//   deleteContact,
// };
const Contact = require('../models/contact');

// Get all contacts with pagination and sorting
const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'firstName', order = 'asc' } = req.query;

    const currentPage = Math.max(1, parseInt(page)); // Ensure page >= 1
    const skip = (currentPage - 1) * limit;
    const sortOrder = order === 'asc' ? 1 : -1;

    const contacts = await Contact.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ [sortBy]: sortOrder });

    const totalContacts = await Contact.countDocuments();

    res.status(200).json({
      contacts,
      totalContacts,
      totalPages: Math.ceil(totalContacts / limit),
      currentPage,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contacts', error: err.message });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: 'Error creating contact', error: err.message });
  }
};

// Update a contact
const updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: 'Error updating contact', error: err.message });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting contact', error: err.message });
  }
};

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
