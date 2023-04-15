import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';
import './InviteForm.css';
mixpanel.init('24382e06ab44f0ebb6a5e1913b4d5862',{
  debug: true 
});
const InviteForm = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const [errors, setErrors] = useState({});
  const history = useHistory();
  const  Project = localStorage.getItem("projectIdFromProjectLists");

  const handleContributorChange =async (event3) => {
    event3.preventDefault();
    const response7 = await  fetch(`/addcontributortoproject/${Project}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role })
      });
      console.log(response7.status);
      if (response7.status === 409) {
        window.alert('this user is already a contributor in the project');
        history.push('/ProjectList')
      }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    let errors = {};

    if (email.trim() === '') {
      errors.email = 'Email is required';
    }
  
    if (Object.keys(errors).length === 0) {
      const senderemail = localStorage.getItem('emailfromtoken');
      //recuperer l'id du projet -> projectname
      //const projectName = localStorage.getItem('projectID');
      const response2 = fetch(`/emailinvitation/${Project}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  email, role, senderemail }),
        
      });
      mixpanel.track(' Email Invitation to Project', {
        'User_Email': email,
        'Role_Added_To_The_User': role,

      });
      localStorage.setItem('EmailFromInvitation', JSON.stringify(email));
      localStorage.setItem('RoleFromInvitation', JSON.stringify(role));
    // Logic to send invitation using email, projectName and role
  }
  setErrors(errors);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
    <form style={{ border: "1px solid blue", padding: "20px", width: "500px", height: "250px"}} className="invite-form-container" onSubmit={(event) => { handleSubmit(event);  handleContributorChange(event); }}>
    <label htmlFor="email" className="form-label">
      Email
    </label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      placeholder="Indiquez l'adresse email de la personne que vous souhaitez inviter pour votre projet."

    />
      {errors.email && <span className="error-message">{errors.email}</span>}   

    
    <label htmlFor="role" className="form-label">
      Role
    </label>
    <select 
      id="role"
      value={role}
      onChange={(event1) => setRole(event1.target.value)}
      className="role-select"
    >
      <option value="Developer">Developer</option>
      <option value="Tester">Tester</option>
      <option value="Maintainer">Maintainer</option>

    </select>
    <div style={{display: "flex", justifyContent: "center"}} >
    <button style={{marginTop :"10px",width:"200px"}} className="btn btn-primary w-40   rounded-pill" type="submit" onClick={(event) => {handleSubmit(event); handleContributorChange(event);}} >
      Inviter
    </button>
    </div>
  </form>
  </div>
  );
};

export default InviteForm;