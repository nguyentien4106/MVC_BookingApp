import React, { useEffect, useState } from 'react';
import { service } from '../../../service';
import DataTable from 'react-data-table-component';
import { Edit, Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ServiceDetail } from './ServiceDetail';
import { Box } from '@mui/material';
import { notify } from '../../../helpers/functionHelper';
import { Store } from 'react-notifications-component';

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

export default function ServiceContainer() {
  const [services, setServices] = useState([]);
  const [currentService, setCurrentService] = useState(null)
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    service.get('/Admin/Service/GetAll').then(data => {
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
          key={row.Id}
          onClick={() => {
            setOpen(prev => !prev)
            setCurrentService(row)
          }}
          style={{ cursor: 'pointer' }}
        >
          <Edit></Edit>
        </i>,
        <i onClick={() => handleDelete(row)} style={{ cursor: 'pointer' }}>
          <Delete></Delete>
        </i>,
      ],
    },
  ];

  const handleDelete = row => {
    service.delete(`/Admin/Service/Delete/${row.Id}`).then(rs => {
      notify(Store, rs.IsSuccessfully, rs.Message)
      if(rs.IsSuccessfully){
        setServices(prev => prev.filter(item => item.Id !== row.Id))
      }
    })
  }

  return (
    <div>
      <div className="d-flex justify-content-end">
      <button
        className="btn btn-primary"
        onClick={() => setOpenForm((prev) => !prev)}
      >
        Create New
      </button>
      </div>
      <div className="table">
          <React.Fragment>
            <DataTable
              columns={columns}
              data={services}
              pagination
              title="Services"
              highlightOnHover
              customStyles={customStyles}
            />
            
            {
              open && <Dialog
                        open={open}
                        onClose={() => setOpen(prev => !prev)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {'Service Information'}
                        </DialogTitle>
                        <DialogContent>
                          <Box>
                            <ServiceDetail item={currentService}/>
                          </Box>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setOpen(prev => !prev)} autoFocus>
                            Close
                          </Button>
                        </DialogActions>
                      </Dialog>
            }

            {
              openForm && <Dialog
                          open={openForm}
                          onClose={() => setOpenForm(prev => !prev)}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {'New Service Information'}
                          </DialogTitle>
                          <DialogContent>
                            <Box>
                              <ServiceDetail/>
                            </Box>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={() => setOpenForm(prev => !prev)} autoFocus>
                              Close
                            </Button>
                          </DialogActions>
                        </Dialog>
            }
          </React.Fragment>
      </div>
    </div>
  );
}
