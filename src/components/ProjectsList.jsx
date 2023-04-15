import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import NewProjectModal from './NewProjectModal';
import Afficheprojectmodel from './afficheprojectModel';
import ProjectDetails from './afficheprojectDetails';
import UpdateProjectModal from './UpdateProjectModal ';
import { useHistory } from 'react-router-dom';


export default function ProjectsList() {
    // Fetch User projects
    const userId = localStorage.getItem("idfromtoken");
    const [data, setData] = useState([]);
    const [ids, setIds] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const history = useHistory();

    const handleDeleteChange = async (event3) => {
        event3.preventDefault();
        const response7 = fetch(`/project/deleteProject/${handleRowClick()}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
    };

    const handleAddId = (id) => {
        setIds((prevIds) => [...prevIds, id]);

    };
    useEffect(() => {
        axios.get(`http://localhost:9090/project/myProjects/${userId}`)
            .then(res => {
                console.log(res.data);
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })




    function handleRowClick(id) {
        console.log(`Clicked on project ${id}`);
        localStorage.setItem('projectIdFromProjectLists', id);
        // Store the id in state or local storage
        //history.push('/register')
        return (id)
        
    }
    function handleInviteClick(id){
        console.log(`Clicked on project ${id}`);
        localStorage.setItem('projectIdFromProjectLists', id);
        // Store the id in state or local storage
        return (id, history.push('/invitation'))
    }
    
    function handleDashboardClick(id) {
        console.log(`Clicked on project ${id}`);
        localStorage.setItem('projectIdFromProjectLists', id);
        // Store the id in state or local storage
        return (id, history.push('/dashboard'))
    }


    function handleDetailsClose() {
        setShowDetails(false);
    }
    return (
        <div>
            <NewProjectModal />

            <table className="table table-hover" style={{ border: "3px solid black", margin: 30 }}>
                <thead>
                    <tr className='table-info'>
                        <th scope="col">App Name</th>
                        <th scope="col">OS</th>
                        <th scope="col">Platform</th>
                        <th scope="col">Options</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} >
                            <td>{item.name}</td>
                            <td>{item.opSystem}</td>
                            <td>{item.platform}</td>
                            <td>
                                <button onClick={() => handleRowClick(item._id)} style
                                    ={{ border: 'none', outline: 'none' }} class="btn btn-light w-30 rounded-pill"> <UpdateProjectModal/>   </button>
                                <button type="button" class="btn btn-danger  w-30 rounded-pill" onClick={(event) => {
                                    handleRowClick(item._id); handleDeleteChange(event);
                                }}>Delete</button>
                                {/* <button type="button" class="btn btn-primary  w-30 rounded-pill" onClick={() => handleRowClick(item._id)} ><NavLink to="/invitation">Invite</NavLink></button> */}
                                <button type="button" class="btn btn-primary  w-30 rounded-pill" onClick={() => handleInviteClick(item._id)}>Invite</button>
                                <button type='button' class="btn btn-primary  w-30 rounded-pill" onClick={() => handleDashboardClick(item._id)}>Your space</button>
                                {showDetails && <ProjectDetails itemId={handleRowClick(item._id)} onClose={handleDetailsClose} />}
                                <Afficheprojectmodel itemId={handleRowClick(item._id)} />
                            </td>
                        </tr>
                    ))}


                </tbody>

            </table>
        </div>

    );



}