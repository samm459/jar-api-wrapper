const axios = require('axios');

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
  } catch (err) {
    return false;
  }
}

module.exports = isDesigner;