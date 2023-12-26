import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { service } from '../../../service';
import axios from "axios";
import moment from 'moment';
import { Store } from 'react-notifications-component';
import { getFormData, notifyFail, notifySuccess } from '../../../helpers/functionHelper';

export function Form({ collaborator, setIsLoading }) {
  const { register, handleSubmit, formState: { errors }} = useForm({defaultValues: collaborator});
  const isEdit = !!collaborator
  const [images, setImages] = useState([])
  const [params, setParams] = useState(collaborator)
  const [isSubmit, setIsSubmit] = useState(false)
  const [imagesUpload, setImagesUpload] = useState([])
  const [imagesUploadPreview, setImagesUploadPreview] = useState([])

  useEffect(() => {
    if(collaborator){
      service.getImages(`/Admin/Collaborator/GetUserImages/${collaborator.Id}`).then(setImages)
    }
  }, [])

  console.log(images)

  useEffect(() => {
    if(!isSubmit) {
      return
    }
    if(isEdit){
      setIsLoading(true)
      service.post(`/Admin/Collaborator/Update`, getFormData(params)).then(rs => {
        console.log(rs)
        setIsLoading(false)
        notifySuccess(Store, rs.data.Message)
      })
    }
    else{
      console.log('add')
      setIsLoading(true)
      service.post(`/Admin/Collaborator/Add`, getFormData(params)).then(rs => {
        console.log(rs)
        setIsLoading(false)
        notifySuccess(Store, rs.data.Message)
      })
    }

  }, [params])

  const onUploadChange = e => { 
      const {files} = e.target
      // setImagesUpload(files)
      console.log(files[0])
      for(const file of files){
        setImagesUpload(prev => [...prev, file])
        setImagesUploadPreview(prev => [...prev, URL.createObjectURL(file)])
      }
  }

  return (
    <form onSubmit={handleSubmit(data => {
      setParams(({...params, ...data}))
      setIsSubmit(true)
    })}>
        <div className='d-flex justify-content-between' style={{width: "100%"}}>
          <div className='form-group' style={{width: "50%"}}>
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
          <div className='form-group' style={{width: "50%"}}>
            <label>Last Name</label>
            <input className='form-control'{...register('LastName', { required: true })} />
            {errors.LastName && <p className='text-danger'>Last name is required.</p>}
          
            <label>Birth Date</label>
            <input className='form-control'{...register('BirthDate', {
              valueAsDate: true,
              value: collaborator ? moment(collaborator.BirthDate).toDate() : '',
            })} defaultValue={new Date().toISOString().substring(0, 10)} type='date'/>
          
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
          <div className='form-group'>
            <label>UserImages</label>
            <input className='form-control'{...register('UserImages')} type='file' multiple onChange={onUploadChange} accept='image/*'/>
            <hr></hr>
            {
              images && images.map(item => <img key={`${item}`} height={300}  src={item}></img>)
            }
            {
              imagesUploadPreview && imagesUploadPreview.map(item => <img key={`${item}`} height={300}  src={item}></img>)
            }
        </div>
        </div>
        
        <input type="submit" />
    </form>
  );
}
