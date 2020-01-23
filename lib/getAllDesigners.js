const getActiveClients = require('./getActiveClients');

/**
 * async function getAllDesigners
 * 
 * Makes a unique array of writer objects from client array
 * then add respective clients to their writer object.
 * @param {string} key 
 * 
 * @public
 */
async function getAllDesigners(key) {
  let clients = await getActiveClients(key);
  // Get a unique list of designers from clients
  let designers = [];
  // Make a list of writers from clients
  for (client of clients) {
      if (!client.designer) continue;
      if (!designers.some(designer => designer.email === client.designer.email)) {
          designers.push(client.designer);
      }
  }
  // attach clients to their writers
  for (client of clients) {
      if (client.designer) {
          for (designer of designers) {
              if (!designer.clients) designer.clients = [];
              if (client.designer.email == designer.email) {
                  designer.clients.push({
                      name: client.name,
                      createdAt: client.createdAt,
                      users: client.users
                  });
              }
          }
      }
  }
  return designers;
}

module.exports = getAllDesigners;