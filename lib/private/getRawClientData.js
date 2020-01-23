const axios = require('axios'); 

/**
 * async function getRawClientData
 * 
 * Fetches a page of client data from Jar api.
 * @param {number} page page number
 * @param {string} key auth token for Jar
 * 
 * @private 
 */
async function getRawClientData(page, key) {
    return await axios.get(
      `https://app.jarhq.com/api/customers/client_companies.json?page=${page}`, 
      {
        headers: {'X-Auth-Token': key}
      }
    );
}

module.exports = getRawClientData;