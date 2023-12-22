import React, { useEffect, useState } from 'react'
import { service } from '../../../service'
import DataTable from 'react-data-table-component';
import { Form } from './Form';
import ReactLoading from 'react-loading';
import { handleFiles } from '../../../../helpers/handleImage';
export default function CollaboratorContainer(props) {
    const [collaborators, setCollaborators] = useState([])
    const [isAdding, setIsAdding] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState(null)

    useEffect(() => {
        service.get("/Admin/Collaborator/getall").then(data => {
            setCollaborators(data)
        })

    }, [isLoading])

    const handleDelete = id => {
        setIsLoading(prev => true)
        service.delete(`/Admin/Collaborator/delete/${id}`).then(data => {
            setIsLoading(prev => false)
        })
    }

    const handleEdit = id => {
        setIsLoading(true)
        service.getImages(`/Admin/Collaborator/GetUserImages/${id}`).then(imgs => {
            setImages(imgs)
            setIsLoading(false)
        })
    }

    const handleCell = (row) => {
        return (
            <div >
                <button className='btn btn-outline-danger' onClick={() => handleDelete(row.id)}>Delete</button>
                <button className='btn btn-outline-primary' onClick={() => handleEdit(row.id)}>Edit</button>
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
            minWidth: '100px'

        },
        {
            name: 'Birth of Date',
            selector: row => row.birthDate,
            sortable: true,
            minWidth: '150px'

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
        }
    ];


    return (
        <div>
            {
                images && images.map(item => <img key={`${item}`} height={300}  src={item}></img>)
            }
            {
                isLoading && <div className='blockUI'>
                                <div className='blockUI__mask' />
                                <div className='blockUI__inner'>
                                    <ReactLoading color='blue' type='spin' height={100} width={100}></ReactLoading>
                                </div>
                            </div>
            }
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
