import React,{useState} from 'react'
import NewProjectForm from './NewProjectForm';
import ProjectDetails from './afficheprojectDetails';
import Modal from 'react-modal';

Modal.setAppElement('#root')

export default function Afficheprojectmodel(props) {
      const [modalIsOpen, setModalIsOpen] = useState(false)
      const { itemId } = props;  
      // localStorage.setItem("itemId",itemId);

    return(
        <>
        <button type="button" class="btn btn-primary  w-30 rounded-pill" onClick={() => setModalIsOpen(true)} onRequestClose={() => setModalIsOpen(false)}> Details</button>
      <div>
      <Modal isOpen={modalIsOpen} style={{ width: 400, height: 400, content: { width: 1200, height: 250 }}}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setModalIsOpen(false)} > X</button>

          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ProjectDetails itemId={itemId} />
          
          </div>
        </Modal>
      </div>
        </>
    )
}