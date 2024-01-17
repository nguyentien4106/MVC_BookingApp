import React, { useEffect, useState } from 'react'
import { Provinces } from '../../../data/provinces'
import { service } from '../../../service'
import { notify } from '../../../helpers/functionHelper';
import { Store } from 'react-notifications-component';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function Filter({ filterParams, onSetFilterParams }) {
    const [province, setProvince] = useState(filterParams.Province)
    const [districts, setDistricts] = useState([{district_name: "All", district_id: -1}])
    const [district, setDicstict] = useState(filterParams.DistrictName)
    console.log(filterParams)
    const [fromAge, setFromAge] = useState(filterParams.FromAge)
    const [toAge, setToAge] = useState(filterParams.ToAge)
    const [value, setValue] = React.useState([17, 37]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
        if(province.province_id === -1) return

        service.get(`https://vapi.vnappmob.com/api/province/district/${province}`).then(rs => {
            const { results } = rs
            results.unshift({district_name: "All", district_id: -1})
            setDistricts(results)
        })
    }, [province])


    const handleSearch = () => {
        if(fromAge > toAge){
            notify(Store, false, "Khoảng tuổi không hợp lệ!")
            return
        }
        
        onSetFilterParams(prev => Object.assign({}, filterParams, {
            Province: province,
            ProvinceName: Provinces.find(prov => prov.province_id === province)?.province_name ?? 'All',
            DistrictName: district,
            FromAge: fromAge,
            ToAge: toAge,
            isSubmit: true
        }))
    }

    const [isShow, setIsShow] = useState(false)

    return (
        <div className="filter-container">
            <div className="row">
                <div className="col-3">
                    <div className="mb-3 row">
                        <label htmlFor="province" className="col-sm-2 col-form-label">Quận</label>
                        <div className="col-sm-10 align-self-center">
                            <select className='col-sm-8' value={province} onChange={(e) => setProvince(e.target.value)} htmlFor="province">
                                <option value={-1}>All</option>
                                {
                                    Provinces.map(prov => <option value={prov.province_id} key={prov.province_id}>{prov.province_name}</option>)
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="mb-3 row">
                        <label htmlFor="district" className="col-sm-2 col-form-label">Huyện</label>
                        <div className="col-sm-10 align-self-center">
                            <select className='col-sm-8' value={district.district_name} onChange={(e) => setDicstict(e.target.value)} htmlFor="district">
                                {
                                    districts && districts.map(prov => <option value={prov.district_name} key={prov.district_name}>{prov.district_name}</option>)
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    {/* <div className="mb-3 row">
                        <label htmlFor="age" className="col-sm-2 col-form-label">Tuổi</label>
                        <div className="col-sm-10 align-self-center">
                            <select className='col-sm-3' value={fromAge} onChange={(e) => setFromAge(+e.target.value)}>
                                {
                                    Array.from({length: 36}, (_, i) => i).map(item => <option value={item} key={item}>{item}</option>)
                                }
                            </select>
                            <label>-</label>
                            <select className='col-sm-3' value={toAge} onChange={(e) => setToAge(+e.target.value)} >
                                {
                                    Array.from({length: 36}, (_, i) => i).map(item => <option value={item} key={item}>{item}</option>)
                                }
                            </select>
                        </div>
                    </div> */}
                    <div className='relative'>
                        <button className='button-search' onClick={() => setIsShow(!isShow)}>Age</button>
                        <div>
                        {
                            isShow && <Box sx={{ width: 300 }}>
                                        <Slider
                                            getAriaLabel={() => 'Temperature range'}
                                            value={value}
                                            onChange={handleChange}
                                            valueLabelDisplay="auto"
                                        />
                                    </Box>
                        }
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <button className='btn btn-primary' onClick={handleSearch}>Tìm kiếm</button>
                </div>
                
            </div>
           
        </div>
    )
}
