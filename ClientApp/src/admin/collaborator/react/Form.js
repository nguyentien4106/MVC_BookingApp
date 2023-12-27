import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { service } from '../../../service';
import moment from 'moment';
import { Store } from 'react-notifications-component';
import { getFormData, notify } from '../../../helpers/functionHelper';
import { Delete } from '@mui/icons-material';


export function Form({ collaborator, setIsLoading }) {
  const { register, handleSubmit, formState: { errors }} = useForm({defaultValues: collaborator});
  const isEdit = !!collaborator
  const [params, setParams] = useState(collaborator)
  const [isSubmit, setIsSubmit] = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  const [birthDate, setBirthDate] = useState(moment(collaborator.BirthDate).format("yyyy-MM-DD"))

  useEffect(() => {
    if(collaborator){
      service.getImages(`/Admin/Collaborator/GetUserImages/${collaborator.Id}`).then(response => {
        console.log(response)
        const fileImages = response.map((item, idex) => new File([item.file], `image${idex}.jpeg`))
        setPreviewImages(prev => [...prev, ...fileImages])
      })
    }
  }, [])

  useEffect(() => {
    if(!isSubmit) {
      return
    }
    console.log(previewImages)
    if(isEdit){
      update()
    }
    else{
      add()
    }

  }, [params])

  const update = () => {
    setIsLoading(true)
    service.post(`/Admin/Collaborator/Update`, getFormData(params, previewImages)).then(rs => {
      console.log(rs)
      setIsLoading(false)
      notify(Store, rs.data.IsSuccessfully, rs.data.Message)
    })
  }

  const add = () => {
    console.log('add')
    setIsLoading(true)
    service.post(`/Admin/Collaborator/Add`, getFormData(params, previewImages)).then(rs => {
      console.log(rs)
      setIsLoading(false)
      notify(Store, rs.data.IsSuccessfully, rs.data.Message)
    })
  }

  const onUploadChange = e => { 
      const {files} = e.target
      console.log(files)
      for(const file of files){
        setPreviewImages(prev => [...prev, file])
      }
  }

  const handleDeleteImagePreview = image => {
      setPreviewImages(prev => prev.filter(img => img !== image))
  }

  const renderPreviewImages = () => {
    return previewImages && previewImages.map((img, index) => {
      return (
        <div className='col-3 image' key={index}> 
          <img height={300} src={URL.createObjectURL(img)} className=''></img>
          <i onClick={() => handleDeleteImagePreview(img)} style={{ cursor: 'pointer' }}><Delete></Delete></i>
        </div>
      )})
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
          <div className='form-group'>
            <label>UserImages</label>
            <input className='form-control'{...register('UserImages')} type='file' multiple onChange={onUploadChange} accept='image/*'/>
            <hr></hr>
            {
              renderPreviewImages()
            }
        </div>
        </div>
        
        <input type="submit" />
    </form>
  );
}
