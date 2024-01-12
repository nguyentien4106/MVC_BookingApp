import React, { useEffect, useState } from 'react'
import { service } from '../../../service'
import CollaboratorCard from './CollaboratorCard'
export default function BookingContainer() {
    const [avatars, setAvatars] = useState(null)
    const [collaborators, setCollaborators] = useState([])
    
    useEffect(async () => {
        const getImages = async () => {
            service.getImages('/Home/GetAvatars').then(images => { 
                setAvatars(images.map(item => new File([item.file], `${item.name}`)))
            })
        }
        await getImages();
    }, [])

    useEffect(() => {
        if(!avatars) return

        service.get("/Home/GetCollaborators").then(response => {
            response.Data.map(collaborator => {
                collaborator.Avatar = avatars.find(avatar => avatar.name.includes(collaborator.Id))
                return collaborator
            })

            setCollaborators(response.Data)
        })
    }, [avatars])
    
    return (
        <div className='container'>
            <div className='grid-container'>
                {
                    collaborators && collaborators.map(collaborator => <div className='grid-item' key={collaborator.Id}><CollaboratorCard collaborator={collaborator} /></div>)
                }
            </div>
        </div>
    )
}
