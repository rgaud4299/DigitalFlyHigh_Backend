const transporter = require('../utils/mailer');
const util = require('util');
const sendMail = util.promisify(transporter.sendMail).bind(transporter);
const Quote = require('../models/Quote');


const  quote =  async (req, res) => {

    try {
        const {
            name,
            businessName,
            email,
            phone,
            website,
            social,
            message
        } = req.body;

        const quote = new Quote({
            name,
            businessName,
            email,
            phone,
            website,
            social,
            message
        });

        // console.log('qqqq',req.body);
        await quote.save();
        console.log('Quotion Save to DB');

        const mailUser = {
            from: process.env.EMAIL_company,
            to: email,
            subject: 'Digital Fly High - Quote Request',
            text: `Thank you for your quote request.
Hi ${name}, we have received your request. Our team will contact you soon.`
        };

        // Email to HR
        const mailHR = {
            from: process.env.EMAIL_company,
            to: process.env.HR_EMAIL, // HR email from .env
            subject: 'New Quote Request - Digital Fly High',
            text: `New quote request received.

Name: ${name}
Business Name: ${businessName}
Email: ${email}
Phone: ${phone}
Website: ${website}
Social: ${social}
Message: ${message}`
        };

        sendMail(mailUser);
        sendMail(mailHR);



        res.status(201).json({ message: 'Quote submitted and emails sent.' });
    } catch (err) {

        res.status(500).json({ error: 'Something went wrong to backend.', err });
    }
};

module.exports=quote;