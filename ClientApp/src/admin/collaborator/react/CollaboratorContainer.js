import React, { useEffect, useState } from 'react';
import { service } from '../../../service';
import DataTable from 'react-data-table-component';
import { FormGeneralInformation } from './form/FormGeneralInformation';
import { Store } from 'react-notifications-component';
import { notify } from '../../../helpers/functionHelper';
import Loading from '../../../components/Loading';
import MenuOptions from './MenuOptions';
import { StatusAction } from './constants';
import FormBookingInformation from './form/FormBookingInformation';

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

export default function CollaboratorContainer(props) {
  const [collaborators, setCollaborators] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [collaborator, setCollaborator] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState(StatusAction.Show)

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
      cell: collaborator => <MenuOptions items={getItems(collaborator)}/>
    },
  ];

  const getItems = collaborator => [
    {
      name: "Sửa thông tin cơ bản CTV",
      action: () => {
        setCurrentAction(StatusAction.EditGeneralInformation)
        setCollaborator(collaborator)
      }
    },
    {
      name: "Sửa thông tin Booking",
      action: () => {
        setCurrentAction(StatusAction.EditBookingInformation)
        setCollaborator(collaborator)
        console.log('sửa thông tin Booking', collaborator)
      }
    },
    {
      name: "Xem chi tiết",
      action: () => {
        setCollaborator(collaborator)
        console.log('xem chi tiết', collaborator)
      }
    },
    {
      name: "Xoá CTV",
      action: () => {
        console.log('Xoá CTV', collaborator)
        handleDelete(collaborator)
      }
    },
  ]

  useEffect(() => {
    setIsLoading(true)
    service.get('/Admin/Collaborator/getall').then((response) => {
      console.log(response);
      setIsLoading(false)
      setCollaborators(response.Data);
    });
  }, []);

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
          currentAction === StatusAction.Show ? <button className="btn btn-primary" onClick={() => setCurrentAction(StatusAction.Add)}>Create New</button> : 
                                                <button className="btn btn-primary" onClick={() => setCurrentAction(StatusAction.Show)}>Back</button>
        }
      </div>
      <div className="table">
        {
          currentAction === StatusAction.EditBookingInformation && <FormBookingInformation collaborator={collaborator} setIsLoading={setIsLoading} setIsAdding={setIsAdding} />
        }
        {
          currentAction === StatusAction.EditGeneralInformation && <FormGeneralInformation collaborator={collaborator} setIsLoading={setIsLoading} setIsAdding={setIsAdding} />
        }
        {
          currentAction === StatusAction.Add && <FormGeneralInformation collaborator={null} setIsLoading={setIsLoading} setIsAdding={setIsAdding} />
        }
        {
          currentAction === StatusAction.Show && <DataTable
                                                      columns={columns}
                                                      data={collaborators}
                                                      pagination
                                                      title="Collaborators"
                                                      highlightOnHover
                                                      customStyles={customStyles}
                                                    /> 
        }
      </div>
    </div>
  );
}
