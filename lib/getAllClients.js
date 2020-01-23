const getRawClientData = require('./private/getRawClientData');

/**
 * async function getAllClients
 * 
 * Loops through all pages of clients returned by Jar api
 * and pushes each client object to an array.
 * @param {string} key auth token for Jar
 * 
 * @public
 */
async function getAllClients(key) {
  let page = 1;
  let totalPages = 0;
  let pageData = [];

  do {
      let response = await getRawClientData(page, key);
      totalPages = response.data.totalPages;
      pageData.push(response.data.data);
      page++;
  } while (page <= totalPages);

  // Merge arrays from each page into single array of client objects
  let clients = [].concat.apply([], pageData);

return clients;
}

module.exports = getAllClients;