import React, { useEffect, useState } from 'react';
import { service } from '../../../../service';
import moment from 'moment';
import { Store } from 'react-notifications-component';
import { getFormData, notify } from '../../../../helpers/functionHelper';
import { Delete } from '@mui/icons-material';
import { Provinces } from '../../../../data/provinces';

const requireItems = [
  "FirstName", "LastName", "PhoneNumber", "V1", "V2", "V3", "Address"
]

export function FormGeneralInformation({ collaborator, setIsLoading }) {
  const isEdit = !!collaborator
  const [params, setParams] = useState(collaborator ?? {})
  const [isSubmit, setIsSubmit] = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  const birthDateInit = collaborator ? moment(collaborator.BirthDate).format("yyyy-MM-DD") : moment().format("yyyy-MM-DD")
  const [birthDate, setBirthDate] = useState(birthDateInit)
  const [fieldErrors, setFieldErrors] = useState([])
  const [province, setProvince] = useState(Provinces[0].province_id)
  const [provinceText, setProvinceText] = useState(Provinces[0].province_name)
  const [districts, setDistricts] = useState([])
  const [districtText, setDistrictText] = useState("")

  useEffect(() => {
    if(collaborator){
      service.getImages(`/Admin/Collaborator/GetUserImages/${collaborator.Id}`).then(response => {
        const fileImages = response.map((item, idex) => new File([item.file], `${item.name}.jpeg`))
        setPreviewImages(prev => [...prev, ...fileImages])
      })
    }
  }, [])

  useEffect(() => {
    if(!isSubmit) {
      return
    }
    isEdit ? update() : add()

  }, [isSubmit])

  useEffect(() => {
    service.get(`https://vapi.vnappmob.com/api/province/district/${province}`).then(rs => {
      setDistricts(rs.results)
      setDistrictText(rs.results[0].district_name)
      setParams(prev => Object.assign({}, prev, { Address: `${rs.results[0].district_name} - ${provinceText} ` }))
    })
  }, [province])

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

  const handleSubmit = () => {
    const errors = getErrors()
    if(!errors.length){
      setIsSubmit(true)
    }
    else{
      notify(Store, false, "Please enter all information")
      setFieldErrors(errors)
    }
  }

  const getErrors = () => {
      return requireItems.filter(item => !params || !params[item])
  }

  const onInputChange = e => {
    const { name, value } = e.target
    setParams(prev => Object.assign({}, prev, {[name]: value}))
  }

  const onProvinceChange = e => {
      setProvince(e.target.value)
      setProvinceText(e.target.options[e.target.selectedIndex].text)
      setParams(prev => Object.assign({}, prev, {Address: `${districtText} - ${e.target.options[e.target.selectedIndex].text}`}))
  }
  
  const getClasses = field => fieldErrors.includes(field) ? "form-control hasError" : "form-control"
  
  return (
      <>
        <div style={{width: "100%"}}>
          <h2>General Information</h2>
          <div className='form-group d-flex flex-gap' style={{width: "50%"}}>
              <div className='col-6'>
                <label>First Name</label>
                <input className={getClasses('FirstName')} name='FirstName' onChange={onInputChange} value={params?.FirstName || ""}/>

                <label>Title</label>
                <input className={`form-control`} name='Title' onChange={onInputChange} value={params?.Title || ""}/>

                <label>Description</label>
                <input className={`form-control`} name='Description' onChange={onInputChange} value={params?.Description || ""}/>
                
                <label>Quận</label>
                <select className='form-control' value={province} onChange={onProvinceChange}>
                    {
                      Provinces.map(prov => <option value={prov.province_id} key={prov.province_id}>{prov.province_name}</option>)
                    }
                </select>

                <label>Address</label>
                <input className={getClasses('Address')} name='Address' onChange={onInputChange} value={params?.Address || ""} disabled/>

                <label>V2</label>
                <input className={getClasses('V2')} name='V2' onChange={onInputChange} value={params?.V2 || ""}/>

                <label>Hobbies</label>
                <input className={`form-control`} name='Hobbies' onChange={onInputChange} value={params?.Hobbies || ""}/>
              </div>

              <div className='col-6'>
                <label>Last Name</label>
                <input className={getClasses('LastName')} name='LastName' onChange={onInputChange} value={params?.LastName || ""}/>
              
                <label>Birth Date</label>
                <input className={`form-control`}
                    type='date' 
                    value={birthDate} 
                    onChange={e => {
                      setBirthDate(moment(e.target.value).format("yyyy-MM-DD"))
                      setParams(prev => Object.assign({}, prev, {BirthDate: moment(e.target.value).format("yyyy-MM-DD")}))
                    }}/>

                <label>Phone Number</label>
                <input className={getClasses('PhoneNumber')} name='PhoneNumber' onChange={onInputChange} value={params?.PhoneNumber || ""}/>

                <label>Huyện</label>
                <select className='form-control' value={districtText} onChange={(e) => {
                  setDistrictText(e.target.value)
                  setParams(prev => Object.assign({}, prev, {Address: `${e.target.value} - ${provinceText}`}))
                }}>
                    {
                      districts && districts.map(dis => <option value={dis.district_name} key={dis.district_id}>{dis.district_name}</option>)
                    }
                </select>

                <label>V1</label>
                <input className={getClasses('V1')}name='V1' onChange={onInputChange} value={params?.V1 || ""}/>

                <label>V3</label>
                <input className={getClasses('V3')} name='V3' onChange={onInputChange} value={params?.V3 || ""}/>

                <label>School</label>
                <input className={`form-control`} name='School' onChange={onInputChange} value={params?.School || ""}/>
              </div>
              <div className='col-12'>
                
                <label>UserImages</label>
                <input className={`form-control`} type='file' multiple onChange={onUploadChange} accept='image/*'/>
                <hr></hr>
                {
                  renderPreviewImages()
                }
              </div>
          </div>
        </div>
        <input type="submit" onClick={handleSubmit}/>
    </>
  );
}
