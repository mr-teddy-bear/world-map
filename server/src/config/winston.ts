import log4js from 'log4js';

log4js.configure({
  appenders: {
    file: {
      type: 'file',
      filename: 'logs/api.log',
      maxLogSize: 10 * 1024 * 1024,
      backups: 25,
      compress: true,
      encoding: 'utf-8',
      mode: 0o0640
    },
    out: {
      type: 'stdout'
    }
  },
  categories: {
    default: { appenders: ['file', 'out'], level: 'trace' }
  }
});

const logger = log4js.getLogger('api');

export default logger;
