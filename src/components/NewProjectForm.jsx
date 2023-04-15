import React, { useState } from 'react';

//import jwtDecode from 'jwt-decode';



export default function NewProjectForm() {


    const [name, setName] = useState("");
    const [releaseType, setReleaseType] = useState("");
    const [opSystem, setOpSystem] = useState("");
    const [platform, setPlatform] = useState("");

    const [showPopup, setShowPopup] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);

    };

    const handleReleaseChange = (event) => {
        setReleaseType(event.target.value);
    };

    const handleOSChange = (event) => {
        setOpSystem(event.target.value);
    };
    const handlePlatformChange = (event) => {
        setPlatform(event.target.value);
    };


    const userId = localStorage.getItem("idfromtoken");

    // Button Click Handler
    function handleClick() {
        window.alert("Your request has been completed successfully.")

        fetch('/project/addProject/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                name,
                releaseType,
                opSystem,
                platform
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
                <label style={{ margin: 10 }}> OS:</label>
                <div style={{ margin: 20 }}>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="myRadioGroup" id="flexRadioIOS" value="IOS" checked={opSystem === "IOS"}
                            onChange={handleOSChange} />
                        <label class="form-check-label" for="flexRadioIOS">
                            IOS
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="myRadioGroup" id="flexRadioAndroid" value="Android" checked={opSystem === "Android"}
                            onChange={handleOSChange} />
                        <label class="form-check-label" for="flexRadioAndroid">
                            Android
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="myRadioGroup" id="flexRadioWindows" value="Windows" checked={opSystem === "Windows"}
                            onChange={handleOSChange} />
                        <label class="form-check-label" for="flexRadioWindows">
                            Windows
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="myRadioGroup" id="flexRadioMacOs" value="MacOs" checked={opSystem === "MacOs"}
                            onChange={handleOSChange} />
                        <label class="form-check-label" for="flexRadioMacOs">
                            MacOs
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="myRadioGroup" id="flexRadioTVOs" value="TvOs" checked={opSystem === "TvOs"}
                            onChange={handleOSChange} />
                        <label class="form-check-label" for="flexRadioTVOs">
                            TvOs
                        </label>
                    </div>

                </div>

                <label style={{ margin: 10 }}> Platform:</label>
                <div style={{ margin: 20 }}>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="myRadioGroup1" id="flexRadioSwift" value="Swift" checked={platform === "Swift"}
                            onChange={handlePlatformChange} />
                        <label class="form-check-label" for="flexRadioSwift">
                            Swift/Objective-C
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="myRadioGroup1" id="flexRadioReact" value="React Native" checked={platform === "React Native"}
                            onChange={handlePlatformChange} />
                        <label class="form-check-label" for="flexRadioReact">
                            React Native
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="myRadioGroup1" id="flexRadioXamarin" value="Xamarin" checked={platform === "Xamarin"}
                            onChange={handlePlatformChange} />
                        <label class="form-check-label" for="flexRadioXamarin">
                            Xamarin
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="myRadioGroup1" id="flexRadioFlutter" value="Flutter" checked={platform === "Flutter"}
                            onChange={handlePlatformChange} />
                        <label class="form-check-label" for="flexRadioFlutter">
                            Flutter
                        </label>
                    </div>



                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 20 }}>
                    <button type="button" class="btn btn-primary" onClick={handleClick}>Add New App</button>
                </div>



            </form>


        </div>
    );
}