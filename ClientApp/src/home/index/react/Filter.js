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
    const [ages, setAges] = React.useState([filterParams.FromAge, filterParams.ToAge]);

    const handleChange = (event, ages) => {
        setAges(ages)
        onSetFilterParams(prev => Object.assign({}, filterParams, {
            FromAge: ages[0],
            ToAge: ages[1],
            isSubmit: false
        }))
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
        onSetFilterParams(prev => Object.assign({}, filterParams, {
            Province: province,
            ProvinceName: Provinces.find(prov => prov.province_id === province)?.province_name ?? 'All',
            DistrictName: district,
            FromAge: ages[0],
            ToAge: ages[1],
            isSubmit: true
        }))
    }

    const [isShow, setIsShow] = useState(false)

    return (
        <div className="filter-container">
            <div className="row">
                <div className="col-3">
                    <div className="mb-3 row center">
                    <label htmlFor="province" className="col-sm-2 col-form-label">Quận</label>
                        <div className="col-sm-10 align-self-center">
                            <select className='col-sm-8 button-search' value={province} onChange={(e) => setProvince(e.target.value)} htmlFor="province">
                                <option value={-1}>All</option>
                                {
                                    Provinces.map(prov => <option value={prov.province_id} key={prov.province_id}>{prov.province_name}</option>)
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="mb-3 row center">
                        <label htmlFor="district" className="col-sm-2 col-form-label">Huyện</label>
                        <div className="col-sm-10 align-self-center">
                            <select className='col-sm-10 button-search' value={district.district_name} onChange={(e) => setDicstict(e.target.value)} htmlFor="district">
                                {
                                    districts && districts.map(prov => <option value={prov.district_name} key={prov.district_name}>{prov.district_name}</option>)
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className='relative mb-3 row center'>
                        <button className='button-search' onClick={() => setIsShow(!isShow)}>Độ tuổi</button>
                        <div>
                        {
                            isShow && 
                                <div className='absolute select-age'>
                                    <Box sx={{ width: 300 }}>
                                        <Slider
                                            getAriaLabel={() => 'Temperature range'}
                                            value={ages}
                                            onChange={handleChange}
                                            valueLabelDisplay="auto"
                                        />
                                    </Box>
                                </div>
                        }
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <button className='button-search pink' onClick={handleSearch}>Tìm kiếm</button>
                </div>
            </div>
           
        </div>
    )
}
