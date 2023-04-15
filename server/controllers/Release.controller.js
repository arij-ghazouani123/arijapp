import Release from "../modals/release.models.js";
import ValidateUser from"../validation/Users.validation.js";
import contributor from"../modals/contributor.js";
//import user from"../models/userSchema.js";
import nodemailer from"nodemailer";

import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
// Create uploads folder if it doesn't exist
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
// const currentFilePath = new URL(import.meta.url).pathname;
// const uploadsDir = path.join(path.dirname(currentFilePath), "../uploads");

// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

export async function getfile  (req, res)  {
  try {
    const release = await Release.findById(req.params.id);
    if (!release) {
      res.status(404).send({ error: "Release not found" });
      return;
    }

    const filePath = path.join(__dirname, "../uploads", release.apkFile);
    if (!fs.existsSync(filePath)) {
      res.status(404).send({ error: "APK file not found" });
      return;
    }

    res.download(filePath);
    console.log("ddddddddddddd", filePath);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export async function AddReleaseApk (req, res){
  const { Notes, Testeur, Version, Date, lien } = req.body;

  // Check if a file was uploaded
  const apkFile = req.file;
  if (!apkFile) {
    console.log("No APK file uploaded");
    res.status(400).send({ error: "No APK file uploaded." });
    return;
  }

  try {
    // Find the latest release with the same notes
    const lastRelease = await Release.findOne({ apkFile: apkFile.originalname }).sort({ Version: -1 }).exec();

    // Increment the version number by 0.1
    const newVersion = lastRelease ? parseFloat(lastRelease.Version) + 0.1 : 1.0;

    // Create a new release document with the incremented version number
    const newRelease = new Release({
      Notes: Notes,
      Testeur: Testeur,
      Version: newVersion.toFixed(1),
      Date: Date,
      lien: lien,
      apkFile: apkFile.originalname,
    });

    // Save the new release document to the database
    const savedRelease = await newRelease.save();

    // Write the file to disk
    const filePath = path.join(__dirname, "uploads", apkFile.originalname);
    await fs.promises.writeFile(filePath, apkFile);

    console.log("Release added successfully");
    res.status(201).send({ message: "Release added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: (process.env.MAIL_USER = "ea0f8c4f6f5e46"),
      pass: (process.env.MAIL_PASS = "4c396cdd77d5b2"),
    },
  });

  await transport.sendMail({
    from: "contact-buildlab@gmail.com",
    to: "arij.ghazouani22@gmail.com",  
    subject: "test email",
    html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        ">
        <h2 >New Release to Test!          
        
        this mail for notfication  </h2>
         
        <div style="border: 1px solid black; padding: 20px; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333333; background-color: #ffffff; box-shadow: 1px 8px 12px rgba(0, 8, 2, 0.1);">
        <h1 style="font-size: 24px; font-weight: bold; margin-top: 0; margin-bottom: 20px;">please check, a new release to test!!</h1>
        <p style="margin-bottom: 10px;">all information in your compte ...</p>
        <p style="margin-bottom: 10px;"> this mail for notfication </p>
        <p style="margin-bottom: 0;">Thanks for reading!</p>
      </div>
    
        <p>All the best, </p>
         </div>
    `,
  });
};

export async function AddRelease  (req, res) {
  const { Notes, Testeur, Version, Date, File } = req.body;

  console.log(req.body.cv);
  const verif = await Release.findOne({ Version });
  if (verif) {
    console.log("Release With the same Version already exists");
    res.status(403).send({
      error:
        "Release with the same Version already exists ! Please USe An Other Date",
    });
  } else {
    console.log("Success");
    const newEvent = new Release();
    newEvent.Notes = Notes;
    newEvent.Testeur = Testeur;
    newEvent.Version = Version;
    newEvent.Date = Date;

    // to get file from desktop
    if (req.file) {
      console.log(req.file.path);
      let txt = req.file.path;
      let nextTXT = txt.replace("uploads", "");
      let last = nextTXT.replace("images", "");

      newEvent.image = last;
    }
    // to create data in mongo
    newEvent.save();
    FindAllRelease();

    res.status(201).send(newEvent);
    ;
  }
};

export async function FindAllRelease(req, res)  {
  try {
    const data = await Release.find();
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

export async function FindSinglRelease (req, res)  {
  try {
    const data = await Release.findOne({ _id: req.params.id });
    res.status(201).json(data);
    console.log("gggggggggggggggggggg", data);
  } catch (error) {
    console.log(error.message);
  }
};

export async function UpdateRelease  (req, res) {
  const { errors, isValid } = ValidateUser(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      const data = await Release.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(201).json({ message: "Release update with success" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export async function DeleteRelease  (req, res)  {
  try {
    await Release.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: "Release deleted with success" });
  } catch (error) {
    console.log(error.message);
  }
};

export async function FindAllTesteur  (req, res)  {
  try {
    // return data when role =testeur and
    const data = await contributor.find({ role: "Tester" }).populate({
      path: "user",
      select: "userName",
    });
    const aa = data.map((a) => a.userName);
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
  }
};


