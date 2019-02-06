const contactRoutes = require('./contacts');

module.exports = function(app, db) {
    contactRoutes(app, db);      
}