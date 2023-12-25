import React, { useEffect, useState } from 'react';
import { service } from '../../../service';
import DataTable, { createTheme } from 'react-data-table-component';
import { Form } from './Form';
import ReactLoading from 'react-loading';
import { Store } from 'react-notifications-component';
import axios from 'axios';
import { Edit, Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CollaboratorDetail } from './CollaboratorDetail';
import { Visibility } from '@mui/icons-material';
import { Box } from '@mui/material';

export default function CollaboratorContainer(props) {
  const [collaborators, setCollaborators] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [collaborator, setCollaborator] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

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

  const columns = [
    {
      name: 'Mã',
      selector: (row) => row.Code,
      sortable: true,
      cell: (row) => (
        <a href="https://google.com" target="_blank" className="dlink">
          {row.Code}
        </a>
      ),
    },
    {
      name: 'First Name',
      selector: (row) => row.FirstName,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row) => row.LastName,
      sortable: true,
    },
    {
      name: 'Birth of Date',
      selector: (row) => row.BirthDate.substr(0, 10),
      sortable: true,
    },
    {
      name: 'V1',
      selector: (row) => row.V1,
      sortable: true,
      width: '100px',
    },
    {
      name: 'V2',
      selector: (row) => row.V2,
      sortable: true,
      width: '100px',
    },
    {
      name: 'V3',
      selector: (row) => row.V3,
      sortable: true,
      width: '100px',
    },
    {
      name: 'Joined Date',
      selector: (row) => row.Created,
      sortable: true,
    },
    {
      name: 'Action',
      sortable: false,
      cell: (collaborator) => [
        <i
          key={collaborator.Code}
          onClick={() => handleEdit(collaborator)}
          style={{ cursor: 'pointer' }}
        >
          <Edit></Edit>
        </i>,
        <i
          onClick={() => handleDelete(collaborator)}
          style={{ cursor: 'pointer' }}
        >
          <Delete></Delete>
        </i>,
        <i
          onClick={handleClickOpen.bind(this, collaborator)}
          style={{ cursor: 'pointer' }}
        >
          <Visibility></Visibility>
        </i>,
      ],
    },
  ];

  useEffect(() => {
    setIsLoading(true)
    service.get('/Admin/Collaborator/getall').then((response) => {
      console.log(response);
      setIsLoading(false)
      setCollaborators(response.Data);
    });
  }, []);

  const handleClickOpen = (collaborator) => {
    console.log(collaborator);
    setOpen(true);
    setCollaborator(collaborator)
  };

  const handleDelete = (collaborator) => {
    console.log(collaborator)
    setIsLoading(true)
    service.delete(`/Admin/Collaborator/Delete/${collaborator.Id}`).then((response) => {
      console.log(response)
      setIsLoading(false)
      Store.addNotification({
        title: response.IsSuccessfully ? 'Success' : "Fail",
        message: response.IsSuccessfully ? 'Deleted successfully' : 'Fail',
        type: response.IsSuccessfully ? 'success' : 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      })
    })
  }

  const handleEdit = collaborator => {
    console.log('edit', collaborator)
  }

  return (
    <div>
      {isLoading && (
        <div className="blockUI">
          <div className="blockUI__mask" />
          <div className="blockUI__inner">
            <ReactLoading
              color="blue"
              type="spin"
              height={100}
              width={100}
            ></ReactLoading>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-end">
        {!isAdding ? (
          <button
            className="btn btn-primary"
            onClick={() => setIsAdding((prev) => !prev)}
          >
            Create New
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => setIsAdding((prev) => !prev)}
          >
            Back
          </button>
        )}
      </div>
      <div className="table">
        {!isAdding ? (
          <React.Fragment>
            <DataTable
              columns={columns}
              data={collaborators}
              pagination
              title="Collaborators"
              highlightOnHover
              customStyles={customStyles}
            />

            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {'Personal Information'}
              </DialogTitle>
              <DialogContent>
                <Box>
                  <CollaboratorDetail
                    picturePath={'user.picturePath'}
                    collaborator={collaborator}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)} autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        ) : (
          <Form collaborator={collaborator} setIsLoading={setIsLoading}></Form>
        )}
      </div>
    </div>
  );
}
