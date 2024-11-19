import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import ContactForm from './components/ContactForm';
import ContactsTable from './components/ContactsTable';
import './App.css';  // Import the CSS for styling

const App = () => {
  const [fetchDataTrigger, setFetchDataTrigger] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchContacts = () => {
    setFetchDataTrigger(!fetchDataTrigger);
  };

  const openForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  return (
    <Container>
      {/* Heading */}
      <Typography variant="h3" className="main-heading">
        Contact Management
      </Typography>

      {/* Add Contact Button - Only the one at the top left */}
      <Button
        variant="contained"
        color="primary"
        className="add-contact-button"
        onClick={openForm}
      >
        Add Contact
      </Button>

      {/* Contact Form (visible when 'Add Contact' is clicked) */}
      {isFormVisible && <ContactForm closeForm={closeForm} fetchContacts={fetchContacts} />}

      {/* Table of Contacts */}
      <Box sx={{ marginTop: 6 }}>
        <ContactsTable triggerFetch={fetchDataTrigger} />
      </Box>

      {/* Background Overlay */}
      {isFormVisible && <div className="background-overlay show" />}
    </Container>
  );
};

export default App;
