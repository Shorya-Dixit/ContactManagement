import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination, TableSortLabel, Box } from '@mui/material';
import axios from 'axios';
import ContactForm from './ContactForm';

const ContactsTable = ({ triggerFetch }) => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalContacts, setTotalContacts] = useState(0);
  const [sortBy, setSortBy] = useState('firstName');
  const [order, setOrder] = useState('asc');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null); // To store the contact being edited


  const fetchContacts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/contacts', {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          sortBy,
          order,
        },
      });
      setContacts(response.data.contacts);
      setTotalContacts(response.data.totalContacts);
    } catch (error) {
      console.error('Error fetching contacts', error);
    }
  }, [page, rowsPerPage, sortBy, order, triggerFetch]);  // Added triggerFetch as a dependency

  useEffect(() => {
    fetchContacts();  // Fetch contacts every time dependencies change
  }, [fetchContacts]);

  const handleSort = (column) => {
    const isAsc = sortBy === column && order === 'asc';
    setSortBy(column);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to first when rowsPerPage changes
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      fetchContacts(); // Refresh the contacts after deletion
    } catch (error) {
      console.error('Error deleting contact', error);
    }
  };

  const handleAddContact = () => {
    setContactToEdit(null); // Reset editing state when adding a new contact
    setIsFormVisible(true); // Show the Add Contact Form
  };

  const handleEditContact = (contact) => {
    setContactToEdit(contact); // Set the contact to be edited
    setIsFormVisible(true); // Show the form for editing
  };

  const closeForm = () => {
    setIsFormVisible(false); // Close the form
  };

  return (
    <Box sx={{ textAlign: 'center', position: 'relative', marginTop: '30px' }}>

      {/* Background Overlay when ContactForm is visible */}
      {isFormVisible && <div className="background-overlay show" />}

      {/* Contact Table */}
      <Box sx={{ marginTop: 8 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'firstName'}
                    direction={sortBy === 'firstName' ? order : 'asc'}
                    onClick={() => handleSort('firstName')}
                  >
                    First Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'lastName'}
                    direction={sortBy === 'lastName' ? order : 'asc'}
                    onClick={() => handleSort('lastName')}
                  >
                    Last Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell>{contact.firstName}</TableCell>
                  <TableCell>{contact.lastName}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phoneNumber}</TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell>{contact.jobTitle}</TableCell>
                  <TableCell>
                    {/* Edit Button */}
                    <Button variant="contained" color="secondary" onClick={() => handleEditContact(contact)}>
                      Edit
                    </Button>

                    {/* Delete Button */}
                    <Button variant="contained" color="error" onClick={() => handleDelete(contact._id)} sx={{ marginLeft: 1 }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalContacts}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      {/* Contact Form Component */}
      {isFormVisible && <ContactForm fetchContacts={fetchContacts} closeForm={closeForm} contactToEdit={contactToEdit} />}
    </Box>
  );
};

export default ContactsTable;
