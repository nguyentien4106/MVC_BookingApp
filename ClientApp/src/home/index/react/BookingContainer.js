import React, { useEffect, useState } from 'react'
import { service } from '../../../service'
import Loading from '../../../components/Loading'
import Collaborators from './Collaborators'
import Filter from './Filter'

export default function BookingContainer() {
    const [avatars, setAvatars] = useState(null)
    const [collaborators, setCollaborators] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [filterParams, setFilterParams] = useState({
        Province: -1,
        ProvinceName: "All",
        DistrictName: "All",
        FromAge: 18,
        ToAge: 35,
        isSubmit: false
    })

    useEffect(() => {
        const getImages = async () => {
            service.getImages('/Home/GetAvatars').then(images => { 
                setAvatars(images.map(item => new File([item.file], `${item.name}`)))
            })
        }

        getImages();
    }, [])

    useEffect(() => {
        if(!avatars) return
        service.get("/Home/GetCollaborators").then(response => {
            getCollaborators(response)
        })
    }, [avatars])

    useEffect(() => {
        if(!filterParams.isSubmit) return

        setIsLoading(true)
        service.post("/Home/Filters", filterParams).then(response => {
            getCollaborators(response)
        })
    }, [filterParams])

    const getCollaborators = response => {
        response.Data.map(collaborator => {
            collaborator.Avatar = avatars.find(avatar => avatar.name.includes(collaborator.Id))
            return collaborator
        })
        setIsLoading(false)
        setCollaborators(response.Data)
    }

    return (
        <div className='container'>
            {
                isLoading 
                        ? <Loading></Loading> 
                        : 
                        <>
                            <Filter filterParams={filterParams} onSetFilterParams={setFilterParams}></Filter>
                            <br></br>
                            <br></br>
                            <div className='grid-container'>
                                {
                                    collaborators.length ? <Collaborators collaborators={collaborators}></Collaborators> : <>Không tìm thấy kết quả</>
                                }
                            </div>
                        </>
            }
            
        </div>
    )
}
