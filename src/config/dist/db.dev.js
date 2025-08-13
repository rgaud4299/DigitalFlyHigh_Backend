"use strict";

var mongoose = require('mongoose');

require('dotenv').config();

var connectDB = function connectDB() {
  var conn;
  return regeneratorRuntime.async(function connectDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(process.env.DB_PORT_Url);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.DB_PORT_Url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 4:
          conn = _context.sent;
          console.log("MongoDB connected: ".concat(conn.connection.host));
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          console.error('MongoDB connection failed:', _context.t0.message);
          process.exit(1); // Stop the app if DB fails

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

module.exports = connectDB;