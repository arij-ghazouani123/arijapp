import React,{useState} from 'react'
import Modal from 'react-modal';
import UpdateProjectForm from './UpdateProjectForm';

Modal.setAppElement('#root')

export default function UpdateProjectModal() {
      const [modalIsOpen, setModalIsOpen] = useState(false)

    return(
        <>
        <button type="submit"  className="btn btn-primary   rounded-pill"  onClick={() => setModalIsOpen(true)} onRequestClose={() => setModalIsOpen(false)}> Update</button>
      <div>
        <Modal isOpen={modalIsOpen} style={{ width: 500, height: 500 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setModalIsOpen(false)} class="btn btn-primary"> X</button>

          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>

            <UpdateProjectForm />
          </div>
        </Modal>
      </div>
        </>
    )
}