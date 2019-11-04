// Dependencies
let axios = require('axios'); 

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
    return await axios.get(`https://app.jarhq.com/api/customers/client_companies.json?page=${page}`, {headers: {'X-Auth-Token': key}});
}

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
                    designer.clients.push(client);
                }
            }
        }
    }
    return designers;
}

/**
 * async function get getDesignerByEmail
 * 
 * Returns the designer that owns the email passed in.
 * @param {string} email
 * @param {string} key
 * 
 * @public
 */
async function getDesignerByEmail(email, key) {
    let designers = await getAllDesigners(key);
    let designer = designers.find(designer => designer.email == email);
    return designer;
}

/**
 * async function isDesigner
 * 
 * Asks jar is the email and password passed in belog to a Jar user.
 * Returns true if Jar can authenticate the email and password passed in.
 * @param {string} email
 * @param {string} password
 * 
 * @public
 */
async function isDesigner(email, password) {
    try {
        let res = await axios.post('https://contentcucumber.jarhq.com/login', {
            user: {
                email,
                password
            }
        });
        if (res.status == 201) return true;
        else return false;
    } catch {
        return false;
    }
}

/**
 * async function getAllWriters
 * 
 * @alias getAllDesigners
 */
let getAllWriters = getAllDesigners;

/**
 * async function getWriterByEmail
 * 
 * @alias getDesignerByEmail
 */
let getWriterByEmail = getDesignerByEmail;

/**
 * async function isWriter
 * 
 * @alias isDesigner
 */
let isWriter = isDesigner;

module.exports = {
    getAllClients,
    getActiveClients,
    getAllDesigners,
    getAllWriters,
    getDesignerByEmail,
    getWriterByEmail,
    isDesigner,
    isWriter
}
