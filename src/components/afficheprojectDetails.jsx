import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mixpanel from 'mixpanel-browser';
mixpanel.init('24382e06ab44f0ebb6a5e1913b4d5862',{
  debug: true 
});
function ProjectDetails(props) {
  const [projects, setProjects] = useState([]);
  const { itemId } = props; 
  const [contributorRole, setContributorrole] = useState('');
  const userId = localStorage.getItem("idfromtoken");
  console.log(userId);
  useEffect(() => {
    //const projectid = localStorage.getItem('projectIdFromProjectLists');
    async function fetchData() {
      const response1 = await fetch(`/afficherDetailsProjet/${itemId}`);
      const data = await response1.json();
      console.log(data)
      setProjects([data]);
    }
    
    fetchData();
  }, []);

 
  useEffect(() => {
    async function getContributorRole() {
      try {
        const response7 = await fetch(`/getcontributorrole/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response7.json();
        setContributorrole(data.ContributorRole);
      } catch (error) {
        console.error(error);
      }
    }

    getContributorRole();
  }, []);
  
  

  return (
    <table className="table table-hover" style={{ border: "3px solid black", margin: 30 }}>
    <thead>
      <tr className='table-info'>
        <th>Porject Name</th>
        <th>ReleaseType</th>
        <th>OpSystem</th>
        <th>Platform</th>
        <th>Owner </th>
        <th>Owner Role</th>
        <th>Contributors</th>

      </tr>
    </thead>
    <tbody>
      {projects.map((project) => (
        <tr key={project.id}>
          <td>{project.name}</td>
          <td>{project.releaseType}</td>    
          <td>{project.opSystem}</td>
          <td>{project.platform}</td>
          <td>{project.user.userName}</td>
          <td>{contributorRole}</td>
          <td> {project.contributors.map(contributor => `${contributor.user.userName}:${contributor.role}`).join('/')}</td>
        </tr>
      ))}
    </tbody>
  </table>
  );
}

export default ProjectDetails;
