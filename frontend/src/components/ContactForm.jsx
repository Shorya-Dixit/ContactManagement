// ContactForm.js

import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import axios from 'axios';

const ContactForm = ({ fetchContacts, closeForm, contactToEdit }) => {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });

  const [error, setError] = useState('');

  // If there's a contact to edit, set the fields to the current contact data
  useEffect(() => {
    if (contactToEdit) {
      setContact(contactToEdit);
    }
  }, [contactToEdit]);

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation to ensure all fields are filled
    if (
      !contact.firstName ||
      !contact.lastName ||
      !contact.email ||
      !contact.phoneNumber ||
      !contact.company ||
      !contact.jobTitle
    ) {
      setError('All fields are required!');
      return;
    }

    try {
      if (contactToEdit) {
        // Editing an existing contact
        await axios.put(`http://localhost:5000/api/contacts/${contactToEdit._id}`, contact);
      } else {
        // Adding a new contact
        await axios.post('http://localhost:5000/api/contacts', contact);
      }

      fetchContacts(); // Fetch updated contacts after submission
      closeForm(); // Close the form after submission
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error saving contact';
      setError(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        width: '300px',
        zIndex: 9999,
      }}
    >
      <form onSubmit={handleSubmit}>
        {error && (
          <Typography variant="body2" color="error" align="center" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        <Stack spacing={2}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            name="firstName"
            value={contact.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            name="lastName"
            value={contact.lastName}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={contact.email}
            onChange={handleChange}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            name="phoneNumber"
            value={contact.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            label="Company"
            variant="outlined"
            fullWidth
            name="company"
            value={contact.company}
            onChange={handleChange}
          />
          <TextField
            label="Job Title"
            variant="outlined"
            fullWidth
            name="jobTitle"
            value={contact.jobTitle}
            onChange={handleChange}
          />
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
            <Button variant="contained" onClick={closeForm}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {contactToEdit ? 'Save Changes' : 'Add Contact'}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default ContactForm;
