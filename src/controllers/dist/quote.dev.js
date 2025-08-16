"use strict";

var transporter = require('../utils/mailer');

var util = require('util');

var sendMail = util.promisify(transporter.sendMail).bind(transporter);

var Quote = require('../models/Quote');

var quote = function quote(req, res) {
  var _req$body, name, businessName, email, phone, website, social, message, _quote, mailUser, mailHR;

  return regeneratorRuntime.async(function quote$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, businessName = _req$body.businessName, email = _req$body.email, phone = _req$body.phone, website = _req$body.website, social = _req$body.social, message = _req$body.message;
          _quote = new Quote({
            name: name,
            businessName: businessName,
            email: email,
            phone: phone,
            website: website,
            social: social,
            message: message
          }); // console.log('qqqq',req.body);

          _context.next = 5;
          return regeneratorRuntime.awrap(_quote.save());

        case 5:
          console.log('Quotion Save to DB');
          mailUser = {
            from: process.env.EMAIL_company,
            to: email,
            subject: 'Digital Fly High - Quote Request',
            text: "Thank you for your quote request.\nHi ".concat(name, ", we have received your request. Our team will contact you soon.")
          }; // Email to HR

          mailHR = {
            from: process.env.EMAIL_company,
            to: process.env.HR_EMAIL,
            // HR email from .env
            subject: 'New Quote Request - Digital Fly High',
            text: "New quote request received.\n\nName: ".concat(name, "\nBusiness Name: ").concat(businessName, "\nEmail: ").concat(email, "\nPhone: ").concat(phone, "\nWebsite: ").concat(website, "\nSocial: ").concat(social, "\nMessage: ").concat(message)
          };
          sendMail(mailUser);
          sendMail(mailHR);
          res.status(201).json({
            message: 'Quote submitted and emails sent.'
          });
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: 'Something went wrong to backend.',
            err: _context.t0
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

module.exports = quote;