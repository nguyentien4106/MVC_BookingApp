import React, { useEffect, useState } from 'react';
import { service } from '../../../service';
import DataTable from 'react-data-table-component';
import { Form } from './Form';
import ReactLoading from 'react-loading';
import { Store } from 'react-notifications-component';
import { Edit, Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CollaboratorDetail } from './CollaboratorDetail';
import { Visibility } from '@mui/icons-material';
import { Box } from '@mui/material';
import { notify } from '../../../helpers/functionHelper';
import Loading from '../../../components/Loading';

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
        <a href='#' className="dlink pointer cursor" onClick={() => { setCollaborator(row); setIsAdding(prev => !prev) }}>
          {row.Code + 10000}
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
      selector: (row) => row.BirthDate ? row.BirthDate.substr(0, 10) : "",
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
        // <i
        //   onClick={handleClickOpen.bind(this, collaborator)}
        //   style={{ cursor: 'pointer' }}
        // >
        //   <Visibility></Visibility>
        // </i>,
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
    setIsLoading(true)
    service.delete(`/Admin/Collaborator/Delete/${collaborator.Id}`).then((response) => {
      setIsLoading(false)
      notify(Store, response.IsSuccessfully, response.Message)
      
      if(response.IsSuccessfully){
        setCollaborators(prev => prev.filter(item => item.Id !== collaborator.Id))
      }
    })
  }

  const handleEdit = collaborator => {
    setIsAdding((prev) => !prev)
    setCollaborator(collaborator)
  }

  const handleAddNew = () => {
    setIsAdding((prev) => !prev)
    setCollaborator(null)
  }

  return (
    <div>
      {
        isLoading && <Loading />
      }
      <div className="d-flex justify-content-end">
        {
          !isAdding ? <button className="btn btn-primary" onClick={handleAddNew}>Create New</button> : 
                      <button className="btn btn-primary" onClick={() => setIsAdding((prev) => !prev)}>Back</button>
        }
      </div>
      <div className="table">
        {
          !isAdding ? <DataTable
                        columns={columns}
                        data={collaborators}
                        pagination
                        title="Collaborators"
                        highlightOnHover
                        customStyles={customStyles}/> 
                      : <Form collaborator={collaborator} setIsLoading={setIsLoading} setIsAdding={setIsAdding}></Form>
        }
      </div>
    </div>
  );
}
