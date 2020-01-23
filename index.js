const getAllClients = require('./lib/getAllClients');
const getActiveClients = require('./lib/getActiveClients');
const getAllDesigners = require('./lib/getAllDesigners');
const getDesignerByEmail = require('./lib/getDesignerByEmail');
const isDesigner = require('./lib/isDesigner');

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
