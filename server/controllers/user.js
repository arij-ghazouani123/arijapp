import express from "express";
import user from '../modals/user.js'
import project from '../modals/projet.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
/*import Project from '../modals/project.js';

export async function addProjectMember(req, res) {
  try {
    // Récupérer le jeton JWT dans la requête
    const token = req.params.token;

    // Vérifier la validité du jeton JWT et récupérer les données utilisateur et projet
    const { userId, projectId } = jwt.verify(token, process.env.JWT_SECRET);

    // Vérifier si l'utilisateur existe dans la base de données
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Vérifier si le projet existe dans la base de données
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Vérifier si l'utilisateur est déjà membre du projet
    if (project.members.includes(userId)) {
      return res.status(400).json({ message: 'User is already a member of the project' });
    }

    // Ajouter l'utilisateur au projet
    project.members.push(userId);
    await project.save();

    return res.status(200).json({ message: 'User added to the project' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}*/

//register
export async function register ( req,res){
    // Get user input
    const { username, password, email} = req.body;


     // Validate user input
    if (!(email && password && username )) {
      res.status(400).send("All input is required");
    }


     // check if user already exist
    // Validate if user exist in our database
    const oldUser = await user.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exists. Please Login");
    }


    // hashed password
      const hashedPassword = await bcrypt.hash(req.body.password, 10)

    
      user.create(
       
        {
            username: req.body.username,
            email: req.body.email,
            mobile: req.body.mobile,
            password: hashedPassword,
            
            
        }
    ).then(newUser => {

        res.status(200).json({
          message:" User Added Successfully!",newUser});
          //sendConfirmationEmail(newUser.email, newUser.activationCode);
       
    }).catch(err => {
        res.status(500).json({error: err});
    });

}

// LogIn
export async function logIn(req,res){
  try {


    // Get user input
    const { email, password } = req.body;
    // Validate if user exist in our database

   const User1= await user.findOne({email : req.body.email });
  
   

      if(!User1){
        return res.status(404).send("Invalid Email!")
      }

    //validate password

    const validPass = await bcrypt.compare(req.body.password, User1.password)
    if (!validPass) return res.status(400).send("Invalid Password") ;

      const secret = crypto.randomBytes(64).toString('hex');
      const token = jwt.sign({email:User1.email,role:User1.role,project:User1.projects,Id:User1._id}, secret, { expiresIn: '1h' });
      const decoded = jwt.verify(token, secret);
      const  sender1 =  decoded.email; 
      const role1 = decoded.role;
      const id1 = decoded.Id;
      console.log(sender1);
    return res.json({emailformtoken:sender1,rolefromtoken:role1,idfromtoken:id1});
  } catch (err) {
    console.log(err);
  }
}


// Update User Role
export async function updateUserRole  ( req,res){
  const { email, role } = req.body;

  try {
    const User = await user.findOneAndUpdate({ email }, { role }, { new: true });

    if (!User) {
      return res.status(404).json({ message: "L'utilisateur n'a pas été trouvé" });
    }

    return res.json({ message: "Le rôle de l'utilisateur a été mis à jour avec succès" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du rôle de l'utilisateur" });
  }
  
}

 export default logIn;