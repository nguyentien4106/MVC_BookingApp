import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { service } from '../../../service';
import moment from 'moment';
import { Store } from 'react-notifications-component';
import { getFormData, notify } from '../../../helpers/functionHelper';
import { Delete } from '@mui/icons-material';
import DropdownCheckList from '../../../components/DropdownCheckList';

export function Form({ collaborator, setIsLoading }) {
  const { register, handleSubmit, formState: { errors }} = useForm({defaultValues: collaborator});
  const isEdit = !!collaborator
  const [params, setParams] = useState(collaborator)
  const [isSubmit, setIsSubmit] = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  const birthDateInit = collaborator ? moment(collaborator.BirthDate).format("yyyy-MM-DD") : moment().format("yyyy-MM-DD")
  const [birthDate, setBirthDate] = useState(birthDateInit)
  const [services, setServices] = useState([])

  console.log(collaborator)

  useEffect(() => {
    if(collaborator){
      service.getImages(`/Admin/Collaborator/GetUserImages/${collaborator.Id}`).then(response => {
        const fileImages = response.map((item, idex) => new File([item], `image${idex}.jpeg`))
        setPreviewImages(prev => [...prev, ...fileImages])
      })
    }
  }, [])

  useEffect(() => {
    if(!isSubmit) {
      return
    }
    isEdit ? update() : add()

  }, [params])

  const update = () => {
    setIsLoading(true)
    service.post(`/Admin/Collaborator/Update`, getFormData(params, previewImages)).then(rs => {
      setIsLoading(false)
      notify(Store, rs.IsSuccessfully, rs.Message)
    })
  }

  const add = () => {
    setIsLoading(true)
    service.post(`/Admin/Collaborator/Add`, getFormData(params, previewImages)).then(rs => {
      setIsLoading(false)
      notify(Store, rs.IsSuccessfully, rs.Message)
    })
  }

  const onUploadChange = e => { 
      const {files} = e.target
      for(const file of files){
        setPreviewImages(prev => [...prev, file])
      }
  }

  const handleDeleteImagePreview = image => {
      setPreviewImages(prev => prev.filter(img => img !== image))
  }

  const renderPreviewImages = () => {
    return previewImages && <div width="100%" className='images-preview'>
                              {
                                previewImages.map((img, index) => {
                                  return (
                                    <div className='image-preview' key={index}> 
                                      <img width={250} src={URL.createObjectURL(img)}></img>
                                      <i onClick={() => handleDeleteImagePreview(img)} className='pointer image-preview__remove'><Delete></Delete></i>
                                    </div>
                                  )})
                              }
                            </div>
  }

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
    <form onSubmit={handleSubmit(data => {
      setParams(({...params, ...data}))
      setIsSubmit(true)
    })}>
        <div style={{width: "100%"}}>
          <h2>General Information</h2>
          <div className='form-group d-flex flex-gap' style={{width: "50%"}}>
              <div className='col-6'>
                <label>First Name</label>
                <input className='form-control' {...register('FirstName', { required: true })} />
                {errors.FirstName && <p className='text-danger'>First name is required.</p>}

                <label>Title</label>
                <input className='form-control'{...register('Title')} />

                <label>Description</label>
                <input className='form-control'{...register('Description')}/>

                <label>Address</label>
                <input className='form-control'{...register('Address')} />

                <label>V2</label>
                <input className='form-control'{...register('V2', {required: true})} />
                {errors.V2 && <p className='text-danger'>Vòng 2 is required.</p>}

                <label>Hobbies</label>
                <input className='form-control'{...register('Hobbies')} />
              </div>

              <div className='col-6'>
                <label>Last Name</label>
                <input className='form-control'{...register('LastName', { required: true })} />
                {errors.LastName && <p className='text-danger'>Last name is required.</p>}
              
                <label>Birth Date</label>
                <input className='form-control'
                    {...register('BirthDate')} 
                    type='date' 
                    value={birthDate} 
                    onChange={e => {
                      setBirthDate(moment(e.target.value).format("yyyy-MM-DD"))
                    }}/>

                <label>Phone Number</label>
                <input className='form-control'{...register('PhoneNumber', {required: true})} />
                {errors.phoneNumber && <p className='text-danger'>Phone Number is required.</p>}

                <label>V1</label>
                <input className='form-control'{...register('V1', {required: true})}/>
                {errors.V1 && <p className='text-danger'>Vòng 1 is required.</p>}

                <label>V3</label>
                <input className='form-control'{...register('V3', {required: true})}/>
                {errors.V3 && <p className='text-danger'>Vòng 3 is required.</p>}


                <label>School</label>
                <input className='form-control'{...register('School')} />
              </div>
              <div className='col-12'>
                
                <label>UserImages</label>
                <input className='form-control'{...register('UserImages')} type='file' multiple onChange={onUploadChange} accept='image/*'/>
                <hr></hr>
                {
                  renderPreviewImages()
                }
              </div>
          </div>
          <h2>Booking Information</h2>
          <div className='form-group d-flex flex-gap' style={{width: "50%"}}>
            <div className='col-12'>
                <label>Display Name</label>
                <input className='form-control' {...register('DisplayName', { required: true })} />
                {errors.DisplayName && <p className='text-danger'>Display Name is required.</p>}

                <label>Information</label>
                <input className='form-control'{...register('Information')} />

            </div>
            <div className='col-12'>
                <label>Price</label>
                <input className='form-control'{...register('Price')}/>
                {errors.Price && <p className='text-danger'>Price is required.</p>}

                <label>Services</label>
                <DropdownCheckList names={["Cafe", "LoL", "Valorant"]} handleChange={handleChange} currentValue={services}></DropdownCheckList>

                <label>Status</label>
                <select className='form-control' name="status" id="status" {...register('Status')}>
                  <option value="0">Not Ready</option>
                  <option value="1" defaultValue>Ready </option>
                  <option value="2">Leave</option>
                  <option value="3">Coming soon</option>
                </select>
            </div>
          </div>
        </div>
        
        <input type="submit" />
    </form>
  );
}
