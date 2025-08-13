"use strict";

var express = require('express');

var mongoose = require('mongoose');

var quoteRoute = require('./routes/quote');

var connectDB = require('./config/db');

var cors = require('cors');

var Quote = require('./models/Quote');

var transporter = require('./utils/mailer');

var util = require('util');

var sendMail = util.promisify(transporter.sendMail).bind(transporter);

require('dotenv').config();

var app = express();
app.use(express.json());
app.use(cors());
connectDB();
console.log('hello'); // app.use('/api', quoteRoute);

app.post('/quote', function _callee(req, res) {
  var _req$body, name, businessName, email, phone, website, social, message, quote, mailOptions;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, businessName = _req$body.businessName, email = _req$body.email, phone = _req$body.phone, website = _req$body.website, social = _req$body.social, message = _req$body.message;
          quote = new Quote({
            name: name,
            businessName: businessName,
            email: email,
            phone: phone,
            website: website,
            social: social,
            message: message
          });
          console.log(quote);
          _context.next = 6;
          return regeneratorRuntime.awrap(quote.save());

        case 6:
          console.log('Quotion Save to DB');
          mailOptions = {
            from: 'rgaud4299@gmail.com',
            to: 'rgaud206@gmail.com',
            subject: 'digitalflyhigh',
            text: "Thank you for your quote request',\n          Hi ".concat(name, " received your request. Our team will contact you soon.")
          };
          sendMail(mailOptions);
          res.status(201).json({
            message: 'Quote submitted and emails sent.'
          });
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: 'Something went wrong to backend.',
            err: _context.t0
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
var PORT = process.env.PORT || 6000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});