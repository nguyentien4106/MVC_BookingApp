import React, { useEffect, useState } from 'react';
import { service } from '../../../service';
import DataTable, { createTheme } from 'react-data-table-component';
import { Form } from './Form';
import { Edit, Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CollaboratorDetail } from './CollaboratorDetail';
import { Visibility } from '@mui/icons-material';
import { Box } from '@mui/material';

export default function CollaboratorContainer(props) {
  const [collaborators, setCollaborators] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  // Sample data for testing
  const sampleCollaborators = [
    {
      code: 'C001',
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '1990-01-15',
      description: 'Description of John',
      phoneNumber: '123-456-7890',
      address: '123 Main St',
      v1: '92',
      v2: '58',
      v3: '72',
      hobbies: 'Reading, Swimming',
      school: 'University of XYZ',
      created: '2023-01-01T12:00:00', // Assuming created is a datetime string
    },
    {
      code: 'C002',
      firstName: 'ABC',
      lastName: 'Doe',
      birthDate: '1990-01-15',
      description: 'Description of John',
      phoneNumber: '123-456-7890',
      address: '123 Main St',
      v1: '85',
      v2: '68',
      v3: '88',
      hobbies: 'Reading, Swimming',
      school: 'University of XYZ',
      created: '2023-01-01T12:00:00', // Assuming created is a datetime string
    },
    {
      code: 'C003',
      firstName: 'XYZ',
      lastName: 'Doe',
      birthDate: '1990-01-15',
      description: 'Description of John',
      phoneNumber: '123-456-7890',
      address: '123 Main St',
      v1: '88',
      v2: '88',
      v3: '85',
      hobbies: 'Reading, Swimming',
      school: 'University of XYZ',
      created: '2023-01-01T12:00:00', // Assuming created is a datetime string
    },
    // Add more sample collaborators as needed
  ];
  const handleClick = (title) => {
    console.log(`You clicked me! ${title}`);
  };

  useEffect(() => {
    service.get('/Admin/Collaborator/getall').then((data) => {
      setCollaborators(data);
    });
  }, []);

  const columns = [
    {
      name: 'Mã',
      selector: (row) => row.code,
      sortable: true,
      cell: (row) => (
        <a href="https://google.com" target="_blank" className="dlink">
          {row.code}
        </a>
      ),
    },
    {
      name: 'First Name',
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: 'Birth of Date',
      selector: (row) => row.birthDate,
      sortable: true,
    },
    {
      name: 'V1',
      selector: (row) => row.v1,
      sortable: true,
      width: '100px',
    },
    {
      name: 'V2',
      selector: (row) => row.v2,
      sortable: true,
      width: '100px',
    },
    {
      name: 'V3',
      selector: (row) => row.v3,
      sortable: true,
      width: '100px',
    },
    {
      name: 'Joined Date',
      selector: (row) => row.created,
      sortable: true,
    },
    {
      name: 'Action',
      sortable: false,
      selector: 'null',
      cell: (row) => [
        <i
          key={row.code}
          onClick={handleClick.bind(this, row.code)}
          style={{ cursor: 'pointer' }}
        >
          <Edit></Edit>
        </i>,
        <i
          onClick={handleClick.bind(this, row.code)}
          style={{ cursor: 'pointer' }}
        >
          <Delete></Delete>
        </i>,
        <i
          onClick={handleClickOpen.bind(this, row.code)}
          style={{ cursor: 'pointer' }}
        >
          <Visibility></Visibility>
        </i>,
      ],
    },
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
  };
  const [open, setOpen] = React.useState(false);
  console.log('haha');
  const handleClickOpen = (code) => {
    console.log(code);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="grid-rows-2">
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary"
          onClick={() => setIsAdding((prev) => !prev)}
        >
          Create New
        </button>
      </div>
      <div className="table">
        {!isAdding ? (
          <React.Fragment>
            <DataTable
              columns={columns}
              data={sampleCollaborators}
              pagination
              title="Collaborators"
              highlightOnHover
              customStyles={customStyles}
            />

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {'Personal Information'}
              </DialogTitle>
              <DialogContent>
                <Box>
                  <CollaboratorDetail
                    code={selectedCode}
                    picturePath={'user.picturePath'}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        ) : (
          <Form></Form>
        )}
      </div>
    </div>
  );
}
