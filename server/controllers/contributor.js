import user from '../modals/user.js';
import project from '../modals/projet.js'
import contributor from '../modals/contributor.js';
/////////////////////////////////////////
import mixpanel from 'mixpanel';
// create an instance of the mixpanel client
var Mixpanel = mixpanel.init('24382e06ab44f0ebb6a5e1913b4d5862');

///////////////////////////////////////


//////////////////////////////////////////////////////////
export async function addContributorToProject(req, res) {

  // Find the user to be added as a contributor
  try {
    const { Project } = req.params;
    const pp = await project.findOne({ Project });

    const { email, role } = req.body;
    const userToAdd = await user.findOne({ email });

    // Check if the user is already a contributor to the project
    const existingContributor = await contributor.findOne({
      user: userToAdd._id,
      projects: { $in: [pp._id] },
    });

    if (existingContributor) {
      Mixpanel.track('Contributor Exist', {
        Contributor_email: email,
        Contributor_role: role,

      });
      //console.log('User is already a contributor to the project');
      return res.status(409).send({ message: 'User is already a contributor to the project' });
    } else {
      // Create a new contributor for the user and add them to the project's list of contributors
      const newContributor = new contributor({
        role: role,
        user: userToAdd._id,
        projects: [pp._id],
      });
      await newContributor.save();
      pp.contributors.push(newContributor._id);
      await pp.save();
      Mixpanel.track('Contributor Added', {
        new_User_ID: userToAdd._id,
        new_Contributor_role: role,
        Project_Added_to: pp._id

      });
      console.log('User added as a contributor to the project');
    }
  } catch (error) {
    Mixpanel.track('App Crashed', { error: error });
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
}

//////////////////////////////////////////////////////////


export async function addProject(req, res) {

  try {
    let pro = new project({
      user: req.body.userId,
      name: req.body.name,
      releaseType: req.body.releaseType,
      opSystem: req.body.opSystem,
      platform: req.body.platform,
      contributors: req.body.userId,
    });
    await pro.save();

    const cont = new contributor({ user: pro.user, role: 'Maintainer', projects: pro._id });
    await cont.save();

    Mixpanel.track('New Project Added', {
      User_ID: pro._id,
      Project_Name: pro.name,
      Project_releaseType: pro.releaseType,
      Project_opSystem: pro.opSystem,
      Project_platform: pro.platform,
      Project_contributors: pro.contributors

    });


    res.status(201).send({ message: 'Data saved successfully!' });
  } catch (error) {
    Mixpanel.track('App Crashed', { error: error });
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
}


//////////////////////////////////////////////////////////

export async function DeleteContributorFromProject(req, res) {
  const userID = req.params.user;
  const contrubutortoDelete1 = req.body.contributor;
  const projectName = req.body.project;
  const contributor = await contributor.findOne({ user: userID});
  if (!contributor || contributor.role !== "Maintainer") {
    return { success: false, message: "You are not authorized to perform this action." };
  }

  const project = await project.findOne({ name: projectName });
  if (!project) {
    return { success: false, message: "Project not found." };
  }

const contributorToDelete2 = await project.findOne({ contributors: contrubutortoDelete1.user.userName });

project.contributors.pull(contributorToDelete2._id);
contributorToDelete2.projects.pull(project._id);

// Save the changes to the project and the contributor.
await project.save();
await contributorToDelete2.save();

// Return a success message.
return { success: true, message: "Contributor deleted successfully." };
};


//////////////////////////////////////////////////////////////////
export  async function getContributorRoleByUerID(req, res)  {
  try {
    const user = req.params.user;
    const foundContributor = await contributor.findOne({user:user});
    if (foundContributor) {
      const role = foundContributor.role;
      console.log(role);
      return res.json({ ContributorRole:  role });
    } else {
      res.status(404).json({ message: 'Contributor not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};