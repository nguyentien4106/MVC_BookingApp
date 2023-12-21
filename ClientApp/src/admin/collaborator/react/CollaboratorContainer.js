import React, { useEffect, useState } from 'react'
import { service } from '../../../service'
import DataTable from 'react-data-table-component';
import { Form } from './Form';

export default function CollaboratorContainer(props) {
    const [collaborators, setCollaborators] = useState([])
    const [isAdding, setIsAdding] = useState(false)

    useEffect(() => {
        service.get("/Admin/Collaborator/getall").then(data => {
            setCollaborators(data)
        })
    }, [])

    const columns = [
        {
            name: 'Mã',
            selector: row => row.code,
            sortable: true,
        },
        {
            name: 'First Name',
            selector: row => row.firstName,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: row => row.lastName,
            sortable: true,
        },
        {
            name: 'Birth of Date',
            selector: row => row.birthDate,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Phone Number',
            selector: row => row.phoneNumber,
            sortable: true,
        },
        {
            name: 'Address',
            selector: row => row.address,
            sortable: true,
        },
        {
            name: 'V1',
            selector: row => row.v1,
            sortable: true,
        },
        {
            name: 'V2',
            selector: row => row.v2,
            sortable: true,
        },
        {
            name: 'V3',
            selector: row => row.v3,
            sortable: true,
        },
        {
            name: 'Hobbies',
            selector: row => row.hobbies,
            sortable: true,
        },
        {
            name: 'School',
            selector: row => row.school,
            sortable: true,
        },
        {
            name: 'Joined Date',
            selector: row => row.created,
            sortable: true,
        },

    ];


    return (
        <div>
            <div className='d-flex justify-content-end'>
                <button className='btn btn-primary' onClick={() => setIsAdding(prev => !prev)}>Create New</button>
            </div>
            {
                !isAdding ? <DataTable
                                columns={columns}
                                data={collaborators}
                                pagination
                                title="Collaborators"
                                highlightOnHover         
                                                           
                            /> : <Form></Form>
            }

        </div>
    )
}
