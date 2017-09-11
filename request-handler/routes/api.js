// This file handles GET and POST requests for API routes

// Import DB here

module.exports = {
  GET: {
    // Retrieve user contacts list
    contacts: function getContacts(req, res) {
      return new Promise((resolve, reject) => {
        console.log('api/contacts get request', req);
        // ADD DB QUERY HERE
        resolve();
      });
    },
    // ADD ON MORE GET REQUESTS HERE
  },
  POST: {
    // Update user contacts list
    contacts: function postContacts(req, res) {
      return new Promise((resolve, reject) => {
        console.log('api/contacts post request', req);
        // ADD DB QUERY HERE
        resolve();
      });
    },
    // ADD ON MORE POST REQUESTS HERE
  },
};
