const getAllClients = require('./getAllClients');

/**
 * async function getActiveClients
 * 
 * Get clients that have a status of 'active'.
 * @param {string} key 
 * 
 * @public
 */
async function getActiveClients(key) {
  let clients = await getAllClients(key);
  let activeClients = clients.filter(client => client.status == 'active');
  return activeClients;
}

module.exports = getActiveClients;