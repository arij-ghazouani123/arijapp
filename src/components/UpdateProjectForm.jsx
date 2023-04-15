import React, { useState } from 'react';

//import jwtDecode from 'jwt-decode';



export default function UpdateProjectForm() {


    const [name, setName] = useState("");
    const [releaseType, setReleaseType] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);

    };

    const handleReleaseChange = (event) => {
        setReleaseType(event.target.value);
    };




    //const userId= localStorage.getItem("idfromtoken");
    //const ProjectId= "640e00b0e1d84398fedbe807";
    const ProjectId = localStorage.getItem('projectIdFromProjectLists')

    // Button Click Handler
    function handleClick() {

        fetch(`/project/updateProject/${ProjectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                releaseType,
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data was successfully sent to the server:', data);
                setShowPopup(true);
            })
            .catch(error => {
                console.error('There was an error sending data to the server:', error);
            });

    }

    return (
        <div style={{ width: 500, height: 500, padding: 10 }}>
            <form style={{ border: "2px solid blue", padding: 30 }}>
                <div class="mb-3">
                    <label for="appNameInput" class="form-label">App Name</label>
                    <input type="text" class="form-control" id="appNameInput" value={name} onChange={handleNameChange} />

                </div>
                <div>
                    <select class="form-select" aria-label="Default select example" value={releaseType} onChange={handleReleaseChange}>
                        <option selected>Release Type</option>
                        <option value="Alpha">Alpha</option>
                        <option value="Beta">Beta</option>
                        <option value="Entreprise">Entreprise</option>
                        <option value="Production">Production</option>
                        <option value="Share">Share</option>
                    </select>



                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 20 }}>
                    <button type="submit" className="btn btn-primary w-30  rounded-pill" onClick={handleClick}>Update</button>
                    {showPopup && (
                        <div className="popup">
                            <h2>Request Complete!</h2>
                            <p>Your request has been completed successfully.</p>
                        </div>
                    )}

                </div>



            </form>


        </div>
    );
}