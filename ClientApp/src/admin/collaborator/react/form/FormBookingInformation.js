import React, { useEffect, useState } from 'react'
import { service } from '../../../../service';
import { notify } from '../../../../helpers/functionHelper';
import { Store } from 'react-notifications-component';

export default function FormBookingInformation({collaborator}) {
    const [displayName, setDisplayName] = useState("")
    const [information, setInformation] = useState("")
    const [status, setStatus] = useState(1)
    const [collaboratorServices, setCollaboratorServices] = useState([])
    const [servicesAvailable, setServicesAvailable] = useState([])

    useEffect(() => {
        service.get('/Admin/Service/GetAll').then(rs => {
            setServicesAvailable(rs.Data)
        })
    }, [])

    useEffect(() => {
        service.get(`/Admin/BookingInformation/GetByCollaborator/${collaborator.Id}`).then(rs => {
            const { DisplayName, Information, Status, CollaboratorServices } = rs.Data
            setDisplayName(DisplayName)
            setInformation(Information)
            setCollaboratorServices(CollaboratorServices)
            setStatus(Status)
        })
    }, [])
    const onSubmit = (e) => {
        if(validateAll()){
            service.post("/Admin/BookingInformation/Add", {
                CollaboratorId: collaborator.Id,
                DisplayName: displayName,
                Information: information,
                Status: status,
                CollaboratorServices: collaboratorServices
            }).then(rs => {
                notify(Store, rs.IsSuccessfully, rs.Message)
            })
        }
    }

    const validateAll = () => {
        if(!displayName){
            notify(Store, false, "Please enter display name")
            return false
        }

        if(!collaboratorServices.length){
            notify(Store, false, "Please add at least one service")
            return false
        }
        return true
    }

    const serviceItem = (item, index) => {
        const onChangeNameService = e => {
            setCollaboratorServices(prev => prev.map((item, idx) => index === idx ? Object.assign({}, item, { ServiceId:  e.target.value}) : item))
        }

        const onChangePriceService = e => {
            setCollaboratorServices(prev => prev.map((item, idx) => index === idx ? Object.assign({}, item, { Prices:  e.target.value}) : item))
        }

        const onDeleteService = e => {
            setCollaboratorServices(prev => prev.filter((item, idx) => idx !== index))
        }
        
        return (
            <div key={item.Name} className='form-group d-flex flex-gap' style={{width: "50%"}}>
                <div className='col-6'>
                    <label>Service Name</label>
                    <select className='form-control' onChange={onChangeNameService} value={item.ServiceId}>
                        {
                            servicesAvailable.map(item => <option value={item.Id} key={item.Name}>{item.Name}</option>)
                        }
                    </select>
                </div>
                <div className='col-6'>
                    <label>Price</label>
                    <input type='number' className='form-control' onChange={onChangePriceService} value={item.Prices}></input>
                </div>
                <div className='col-1 d-flex flex-column'>
                    <label>Delete</label>
                    <button className='btn btn-danger' onClick={onDeleteService}>-</button>
                </div>
                
            </div>
        )
    }

    return (
        <div key={`booking-information-form`}>
            <h4>{`Thông tin booking của ${collaborator.FirstName} ${collaborator.LastName} - ${collaborator.Code}`}</h4>
            <br></br>
            <hr/>
            <div className='form-group d-flex flex-gap' style={{width: "50%"}}>
                <div className='col-8'>
                    <label>Display Name</label>
                    <input className='form-control' onChange={(e) => setDisplayName(e.target.value)} value={displayName}/>
                </div>
                <div className='col-8'>
                    <label>Status</label>
                    <select className='form-control' value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value={0}>Not Ready</option>
                        <option value={1}>Ready </option>
                        <option value={2}>Leave</option>
                        <option value={3}>Coming soon</option>
                    </select>
                </div>
                <div className='col-8'>
                    <label>Information</label>
                    <input className='form-control' onChange={(e) => setInformation(e.target.value)} value={information}/>

                </div>
            </div>
            <hr/>
            <div className='form-group d-flex flex-gap' style={{width: "50%"}}>
                <div className='col-8 d-flex justify-content-between'>
                    <label>Services</label>
                    <button className='btn btn-primary' onClick={() => setCollaboratorServices(prev => [...prev, {ServiceId: servicesAvailable[0].Id, Prices: 0, AdditionalInformation: servicesAvailable[0].Description, CollaboratorId: collaborator.Id}])}>+</button>
                </div>
                
            </div>
            {
                collaboratorServices && collaboratorServices.map((item, index) => serviceItem(item, index))
            }
            <button className='btn btn-primary' type="submit" onClick={onSubmit}>Submit </button>
        </div>
    )
}
