import { Button } from 'bootstrap';
import { useState } from 'react';
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '40%',
    left: '80%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '500px'
  },
};


export default function ConnectToStore() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div style={{ border: "2px solid blue", margin: 30, }}>

      <img style={{ width: '180px', height: 'auto', display: 'flex', justifyContent: 'center', marginTop: 60 }} src="https://media.istockphoto.com/id/912819604/vector/storefront-flat-design-e-commerce-icon.jpg?s=612x612&w=0&k=20&c=_x_QQJKHw_B9Z2HcbA2d1FH1U1JVaErOAp2ywgmmoTI=" class="rounded mx-auto d-block" alt="Store"></img>
      <div style={{ display: 'flex', justifyContent: 'center', margin: 25, flexDirection: 'column', padding: 30 }}>
        <h2 style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>Connect to App Store Connect and Intune Company Portal</h2>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }} >
          <a href="https://example.com"><img style={{ width: '100px', height: 'auto' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Huawei_AppGallery.svg/2048px-Huawei_AppGallery.svg.png" class="rounded mx-auto d-block" alt="Store"></img>
          </a>
          <a onClick={() => setModalIsOpen(true)} onRequestClose={() => setModalIsOpen(false)}><img style={{ width: '100px', height: 'auto' }} src="https://img.freepik.com/vecteurs-premium/logo-google-play_578229-280.jpg?w=2000" class="rounded mx-auto d-block" alt="Store"></img>
          </a>
          <a href="https://example.com"><img style={{ width: '100px', height: 'auto' }} src="https://upload.wikimedia.org/wikipedia/fr/0/09/Logo_App_Store_d%27Apple.png" class="rounded mx-auto d-block" alt="Store"></img>
          </a>
        </div>
      </div>
      <div>
        <Modal isOpen={modalIsOpen} style={customStyles}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setModalIsOpen(false)} class="btn btn-primary"> X</button>
          </div>
          <h5 style={{ marginBottom: 20,marginLeft:5,marginTop:10 }}>Upload the Google Dev Console API credentials:</h5>
        <img style={{ width: '100px', height: 'auto',margin:20 }} src="https://img.freepik.com/vecteurs-premium/logo-google-play_578229-280.jpg?w=2000" class="rounded mx-auto d-block" alt="Store"></img>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <input type="file" accept="application/json" onChange={handleFileSelect} />
              {selectedFile && <p>Selected file:: {selectedFile.name}</p>}
            </div>
          </div>
          <a href='https://learn.microsoft.com/en-us/appcenter/distribution/stores/googleplay'
          style={{margin:15,display: 'flex', justifyContent: 'center'}}> Where can I find my .json file?</a>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginLeft:5 }}>
                    <button type="button" class="btn btn-primary" >Connect</button>
                </div>

        </Modal>
      </div>
    </div>

  );

}