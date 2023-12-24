import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { service } from '../../../service';
import axios from "axios";
import moment from 'moment';

export function Form({ collaborator, setIsLoading }) {
  const { register, handleSubmit, formState: { errors }} = useForm({defaultValues: collaborator});
  const isEdit = !!collaborator
  const [images, setImages] = useState([])
  const [params, setParams] = useState(collaborator)
  const options = {
    headers: {
        'Content-Type': 'application/json',
        "Accept" :" "
    }
  }

  useEffect(() => {
    if(collaborator){
      service.getImages(`/Admin/Collaborator/GetUserImages/${collaborator.Id}`).then(setImages)
    }
  }, [])

  useEffect(() => {
    console.log('params in useeffect')
    if(isEdit){
      service.post(`/Admin/Collaborator/Update`, params).then(rs => console.log(rs))
    }
    else{
      // axios.post(`/Admin/Collaborator/Create`, JSON.stringify(params), options).then(rs => console.log(rs))
      
    }
  }, [params])

  const onSubmit = (data) => {
    // Xử lý dữ liệu khi người dùng nhấn nút đăng ký
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(data => setParams(({...params, ...data})))}>
        <div className='form-group'>
          <label>First Name</label>
          <input className='form-control' {...register('FirstName', { required: true })} />
          {errors.FirstName && <p className='text-danger'>First name is required.</p>}

          <label>Last Name</label>
          <input className='form-control'{...register('LastName', { required: true })} />
          {errors.LastName && <p className='text-danger'>Last name is required.</p>}
        
          <label>Title</label>
          <input className='form-control'{...register('Title')} />

          <label>Birth Date</label>
          <input className='form-control'{...register('BirthDate', {
            valueAsDate: true,
            value: collaborator ? moment(collaborator.BirthDate).toDate() : '',
          })} defaultValue={new Date().toISOString().substring(0, 10)} type='date'/>

          <label>Description</label>
          <input className='form-control'{...register('Description')}/>

          <label>Phone Number</label>
          <input className='form-control'{...register('PhoneNumber', {required: true})} />
          {errors.phoneNumber && <p className='text-danger'>Phone Number is required.</p>}

          <label>Address</label>
          <input className='form-control'{...register('Address')} />

          <label>V1</label>
          <input className='form-control'{...register('V1', {required: true})}/>
          {errors.V1 && <p className='text-danger'>Vòng 1 is required.</p>}

          <label>V2</label>
          <input className='form-control'{...register('V2', {required: true})} />
          {errors.V2 && <p className='text-danger'>Vòng 2 is required.</p>}

          <label>V3</label>
          <input className='form-control'{...register('V3', {required: true})}/>
          {errors.V3 && <p className='text-danger'>Vòng 3 is required.</p>}

          <label>Hobbies</label>
          <input className='form-control'{...register('Hobbies')} />

          <label>School</label>
          <input className='form-control'{...register('School')} />

          <label>UserImages</label>
          <input className='form-control'{...register('UserImages')} type='file' multiple/>
          <hr></hr>
          {
            images && images.map(item => <img key={`${item}`} height={300}  src={item}></img>)
          }
        </div>
        <input type="submit" />
    </form>
  );
}
