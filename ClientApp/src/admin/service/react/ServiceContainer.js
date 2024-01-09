import React, { useEffect, useState } from 'react';
import { service } from '../../../service';
import DataTable, { createTheme } from 'react-data-table-component';
import ReactLoading from 'react-loading';
import { Store } from 'react-notifications-component';
import axios from 'axios';
import { Edit, Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ServiceDetail } from './ServiceDetail';
import { Visibility } from '@mui/icons-material';
import { Box } from '@mui/material';

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

export default function ServiceContainer(props) {
  const [services, setServices] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (title) => {
    console.log(`You clicked me! ${title}`);
  };

  useEffect(() => {
    service.get('/Admin/Service/GetAll').then(data => {
      console.log(data.Data)
      setServices(data.Data);
    });
  }, []);

  const columns = [
    {
      name: 'No.',
      selector: (row) => row.Id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.Description,
      sortable: true,
    },
    {
      name: 'Action',
      sortable: false,
      cell: (row) => [
        <i
          key={row.code}
          onClick={handleClick.bind(this, row)}
          style={{ cursor: 'pointer' }}
        >
          <Edit></Edit>
        </i>,
        <i onClick={() => handleDelete(row)} style={{ cursor: 'pointer' }}>
          <Delete></Delete>
        </i>,
        <i
          onClick={handleClickOpen.bind(this, row)}
          style={{ cursor: 'pointer' }}
        >
          <Visibility></Visibility>
        </i>,
      ],
    },
  ];

  const handleDelete = row => {
    console.log(row)
    service.delete(`/Admin/Service/Delete/${row.Id}`).then(result => {
      console.log(result)
    })
  }


 
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const handleClickOpen = (row) => {
    console.log(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              data={services}
              pagination
              title="Services"
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
                  <ServiceDetail service={service}/>
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
          {
            /* <Form service={service} setIsLoading={setIsLoading}></Form> */
          }
        )}
      </div>
    </div>
  );
}
