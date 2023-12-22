import React, { useEffect, useState } from 'react'
import { service } from '../../../service'
import DataTable from 'react-data-table-component';
import { Form } from './Form';
import ReactLoading from 'react-loading';
import { Store } from 'react-notifications-component';
import axios from 'axios';

export default function CollaboratorContainer(props) {
    const [collaborators, setCollaborators] = useState([])
    const [isAdding, setIsAdding] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [collaborator, setCollaborator] = useState(null)

    useEffect(() => {
        service.get("/Admin/Collaborator/getall").then(response => {
            setCollaborators(response.Data)
        })

    }, [isLoading])

    const handleDelete = id => {
        setIsLoading(true)
        service.delete(`/Admin/Collaborator/delete/${id}`).then(data => {
            setIsLoading(false)
            Store.addNotification({
                title: "Wonderful!",
                message: "teodosii@react-notifications-component",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
            })
        })
    }

    const handleEdit = (row) => {
        setIsAdding(true)
        setCollaborator(row)
    }

    const handleCell = (row) => {
        return (
            <div >
                <button className='btn btn-outline-danger' onClick={() => handleDelete(row.id)}>Delete</button>
                <button className='btn btn-outline-primary' onClick={() => handleEdit(row)}>Edit</button>
            </div>
        )
    }

    const columns = [
        {
            name: 'Action',
            cell: (row, index, column, id) => handleCell(row, index, column, id)
        },
        {
            name: 'Mã',
            selector: row => row.Code + 10000,
            sortable: true,
        },
        {
            name: 'First Name',
            selector: row => row.FirstName,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: row => row.LastName,
            sortable: true,
            minWidth: '100px'

        },
        {
            name: 'Birth of Date',
            selector: row => row.BirthDate.substring(0, 10),
            sortable: true,
            minWidth: '150px'

        },
        {
            name: 'Phone Number',
            selector: row => row.PhoneNumber,
            sortable: true,
        },
        {
            name: 'Address',
            selector: row => row.Address,
            sortable: true,
        },
        {
            name: 'V1',
            selector: row => row.V1,
            sortable: true,
        },
        {
            name: 'V2',
            selector: row => row.V2,
            sortable: true,
        },
        {
            name: 'V3',
            selector: row => row.V3,
            sortable: true,
        }
    ];


    return (
        <div>
            {
                isLoading && <div className='blockUI'>
                                <div className='blockUI__mask' />
                                <div className='blockUI__inner'>
                                    <ReactLoading color='blue' type='spin' height={100} width={100}></ReactLoading>
                                </div>
                            </div>
            }
            <div className='d-flex justify-content-end'>
                {
                    !isAdding ?  <button className='btn btn-primary' onClick={() => setIsAdding(prev => !prev)}>Create New</button>
                            :   <button className='btn btn-primary' onClick={() => setIsAdding(prev => !prev)}>Back</button>
                }
            </div>
            {
                !isAdding ? <DataTable
                                columns={columns}
                                data={collaborators}
                                pagination
                                title="Collaborators"
                                highlightOnHover         
                            /> : <Form collaborator={collaborator} setIsLoading={setIsLoading}></Form>
            }

        </div>
    )
}
