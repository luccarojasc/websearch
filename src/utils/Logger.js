const fs = require('fs');
const path = require('path');

class Logger {
  static logError(error) {
    const logPath = path.join(__dirname, '../../logs/error.log');
    const message = `[${new Date().toISOString()}] ${error.message}\n`;
    fs.appendFileSync(logPath, message);
  }
}

module.exports = Logger;
