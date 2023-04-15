import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import user from '../modals/user.js';
import { addContributorToProject } from '../controllers/contributor.js';

export async function sendemail(req, res) {
    let transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '3cee1f13b041fd',
            pass: 'cd5b35005c5224'
        }
    })

    const Project = req.params.projectId;
    const { email, role, senderemail } = req.body;
    const User1 = await user.findOne({ email });


    if (User1) {
        let mailOptions = {
            from: senderemail,
            to: email,
            subject: `You have been invited to join project  `,
            text: `Hello,\n\n has invited you to collaborate on a project & This email will expire in 2 days.`,
            headers: {
                'expires': new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toUTCString()
            },
            html: `<p>Hello,</p><p> ${senderemail} has invited you to collaborate on a new project  as  ${role}.</p>
        <p>You can accept or decline this invitation</p>
        <p>This invitation will expire in 2 days.</p>
        <a target="_blank"><button  onclick="addContributorToProject()" style="background-color: #008CBA; border: none; color: white; padding: 12px 28px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Accepter l'invitation</button></a>
        <p> Note: This invitation was intended for ${email} . If you were not expecting this invitation, you can ignore this email.</p>
        `

        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.send('Error sending email');
            } else {
                console.log('Email sent: ' + info.response);
                console.log(mailOptions);
                res.send('Email sent successfully');
            }

        })
    }
}
export default sendemail;