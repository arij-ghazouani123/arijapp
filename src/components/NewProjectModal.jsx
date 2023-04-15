import React, { useState } from 'react'
import NewProjectForm from './NewProjectForm';
import Modal from 'react-modal';

Modal.setAppElement('#root')

export default function NewProjectModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <>
      <div style={{ float: 'right', margin: '20px' }}>

        <button type="button" class="btn btn-primary rounded-pill" onClick={() => setModalIsOpen(true)} onRequestClose={() => setModalIsOpen(false)}> Add New Project</button>
      </div>
      <div>
        <Modal isOpen={modalIsOpen} style={{ width: 500, height: 500 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setModalIsOpen(false)} class="btn btn-primary"> X</button>

          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>

            <NewProjectForm />
          </div>
        </Modal>
      </div>
    </>
  )
}