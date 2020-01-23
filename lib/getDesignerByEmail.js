const getAllDesigners = require('./getAllDesigners');

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

module.exports = getDesignerByEmail;