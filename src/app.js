const express = require('express');
const mongoose = require('mongoose');
const quoteRoute = require('./routes/quote');
const connectDB = require('./config/db');
const cors = require('cors');
const Quote = require('./models/Quote');
const transporter = require('./utils/mailer');
const util = require('util');
const sendMail = util.promisify(transporter.sendMail).bind(transporter);
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
console.log('hello');

// app.use('/api', quoteRoute);
app.post('/quote', async (req, res) => {

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

        console.log(quote);
       await quote.save();
       console.log('Quotion Save to DB'); 
        const mailOptions = {
            from: 'rgaud4299@gmail.com',
            to: 'rgaud206@gmail.com',
            subject: 'digitalflyhigh',
            text: `Thank you for your quote request',
          Hi ${name} received your request. Our team will contact you soon.`
        }
        
         sendMail(mailOptions);

       

        res.status(201).json({ message: 'Quote submitted and emails sent.' });
    } catch (err) {

        res.status(500).json({ error: 'Something went wrong to backend.', err });
    }
});




const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));