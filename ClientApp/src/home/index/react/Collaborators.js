import React from 'react'
import CollaboratorCard from './CollaboratorCard'

export default function Collaborators({ collaborators }) {
  return (
    <div className='grid-container'>
        {
            collaborators && collaborators.map(collaborator => <div className='grid-item' key={collaborator.Id}><CollaboratorCard collaborator={collaborator} /></div>)
        }
    </div>
    )
}
