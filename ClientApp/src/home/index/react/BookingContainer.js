import React, { useEffect, useState } from 'react'
import { service } from '../../../service'
import CollaboratorCard from './CollaboratorCard'
import Loading from '../../../components/Loading'

export default function BookingContainer() {
    const [avatars, setAvatars] = useState(null)
    const [collaborators, setCollaborators] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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
            response.Data.map(collaborator => {
                collaborator.Avatar = avatars.find(avatar => avatar.name.includes(collaborator.Id))
                return collaborator
            })
            setIsLoading(false)
            setCollaborators(response.Data)
        })
    }, [avatars])
    
    return (
        <div className='container'>
            {
                isLoading ? <Loading></Loading> 
                        : <div className='grid-container'>
                            {
                                collaborators && collaborators.map(collaborator => <div className='grid-item' key={collaborator.Id}><CollaboratorCard collaborator={collaborator} /></div>)
                            }
                        </div>
            }
            
        </div>
    )
}
