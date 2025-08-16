const JobApplication = require("../models/JobApplication");
const transporter = require('../utils/mailer');
const util = require('util');
const sendMail = util.promisify(transporter.sendMail).bind(transporter);
const path = require("path");

  const apply =async (req, res) => {

  try {
    const {
      role,
      fullName,
      email,
      mobileNumber,
      address,
      experience,
      skills,
      education,
      linkedin,
      expectedSalary,
      noticePeriod,
      coverLetter,
      
    } = req.body;

    //  console.log("file:", req.file);
    const newApplication = new JobApplication({
      role,
      fullName,
      email,
      mobileNumber,
      address,
      experience,
      skills,
      education,
      linkedin,
      expectedSalary,
      noticePeriod,
      coverLetter,
      cvFileName: req.file?.filename,
      cvFilePath: req.file ? path.join("uploads/cv", req.file.filename) : null,
    }); 

    // console.log(newApplication);

    await newApplication.save();

      const mailUser = {
            from: process.env.EMAIL_company,
            to: email,
            subject: 'Digital Fly High - JOb Application',
            text: `your job Application received successfully.
Hi ${fullName}, we have received your job Application. Our team will contact you soon.`
        };

        // Email to HR
        const mailHR = {
            from: process.env.EMAIL_company,
            to: process.env.HR_EMAIL, 
            subject: 'New JOb Application Request - Digital Fly High',
            text: `New JOb Application request received.

Name: ${fullName}
ROle: ${role}
Email: ${email}
Phone: ${mobileNumber}
Website: ${linkedin}
Social: ${ skills}
coverLetter: ${coverLetter}`
        };

        sendMail(mailUser);
        sendMail(mailHR);



    res.status(201).json({ success: true, message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error saving job application:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports=apply;