import  express  from "express";
import { body } from "express-validator";
import Users from "../modals/user.js";
import user from "../modals/user.js";
import {sendemail} from "../middlewares/emailinvitation.js";
import { addProject,addContributorToProject, DeleteContributorFromProject,getContributorRoleByUerID} from "../controllers/contributor.js";
import { register, login, logout, sendOTPResetEmail, resetPassword, emailVerification, createCheckOutSession, } from "../controllers/authController.js";

import multer from 'multer';
import { afficherDetailsProjet, deleteProject, getUserPojects, getUserRole, updateProject } from "../controllers/projet.js";

const router = express.Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout/:id").post(logout);
router.route("/OTPReset").post(sendOTPResetEmail);
router.route("/ResetPassword").post(resetPassword);
router.route("/emailVerification").post(emailVerification);
router.route("/createCheckOutSession").post(createCheckOutSession);


router.route('/project/addProject/').post(
        body('user'),
        body('name'),
        body('releaseType'),
        body('opSystem'),
        body('platform'),
        body('contributors'),addProject); 

       router.route('/addcontributortoproject/:Project').post(
        body('email'),
        body('role'),
        addContributorToProject)


////////////////////////////////////////////////////////////////
  router.route('/emailinvitation/:Project').post(sendemail);


router.route('/project/myProjects/:user')
       .get(getUserPojects)

router.route('/project/myRole/:project/:user')
       .get(getUserRole)


router.route('/project/deleteProject/:_id')
       .delete(deleteProject)

router.route('/project/updateProject/:_id')
       .put(updateProject)

router.route('/afficherDetailsProjet/:_id')
       .get(afficherDetailsProjet)

router.route('/DeleteContributor/:_id1/:_id2/:_id3')
       .delete(DeleteContributorFromProject)

 router.route('/getcontributorrole/:user')
       .get(getContributorRoleByUerID)  
export default router;
