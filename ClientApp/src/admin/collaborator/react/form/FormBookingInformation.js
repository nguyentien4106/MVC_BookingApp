import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import DropdownCheckList from '../../../../components/DropdownCheckList';
import Icon from '@mui/material/Icon';

export default function FormBookingInformation({collaborator}) {
    const { register, handleSubmit, formState: { errors }} = useForm({defaultValues: collaborator});
    const [displayName, setDisplayName] = useState(collaborator ? collaborator.DisplayName : "")
    const [information, setInformation] = useState(collaborator ? collaborator.Information : "")
    const [status, setStatus] = useState(collaborator ? collaborator.Status : 1)

    const [services, setServices] = useState([])
    const [numberServices, setNumberServices] = useState(1)

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        console.log(value)
        setServices(
            typeof value === 'string' ? value.split(',') : value,
        );
  };

    return (
        <form >
            <h4>{`Thông tin booking của ${collaborator.FirstName} ${collaborator.LastName}`}</h4>
            <br></br>
            <hr/>
            <div className='form-group d-flex flex-gap' style={{width: "50%"}}>
                <div className='col-6'>
                    <label>Display Name</label>
                    <input className='form-control' />

                    <label>Information</label>
                    <input className='form-control' />

                </div>
                <div className='col-6'>
                    <label>Status</label>
                    <select className='form-control'>
                        <option value={0}>Not Ready</option>
                        <option value={1} selected>Ready </option>
                        <option value={2}>Leave</option>
                        <option value={3}>Coming soon</option>
                    </select>

                    <label>Services</label>

                </div>
                <div className='col-12'>
                    <div className='d-flex justify-content-between'>
                        <button className="btn btn-primary" onClick={() => setNumberServices(prev => prev - 1)}>Remove</button>
                        <button className="btn btn-primary" onClick={() => setNumberServices(prev => prev + 1)}>Add</button>
                    </div>
                </div>
            </div>
            <input type="submit" />
        </form>
    )
}
