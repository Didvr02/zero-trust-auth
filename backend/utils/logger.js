const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '..', 'app.log');

const log = (level, message, context = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = JSON.stringify({
    timestamp,
    level: level.toUpperCase(),
    message,
    context: { ...context, ip: context.ip || 'N/A' },
  }) + '\n';

  fs.appendFile(logFile, logEntry, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
};

const info = (message, context) => log('info', message, context);
const error = (message, context) => log('error', message, context);
const warn = (message, context) => log('warn', message, context);

module.exports = { info, error, warn };
