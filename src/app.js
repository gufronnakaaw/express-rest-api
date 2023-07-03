import server from './utils/server.js';
import logger from './utils/logging.js';

const PORT = 3000;

server.listen(PORT, () => {
  logger.info('App is running');
});
